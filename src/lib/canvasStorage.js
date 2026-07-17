import { getDefaultVariant, isValidPreviewState, isValidVariant } from './canvasBlocks'
import { getDefaultBlockProps, isValidViewport, normalizeBlockProps } from './canvasInspector'

export const WORKSPACES_KEY = 'styleseed_canvas_workspaces'
export const LEGACY_LAYOUT_KEY = 'styleseed_canvas_layout'

/** @typedef {Object} CanvasKitRef @property {'curated'|'custom'} source @property {string} id */

/** @typedef {Object} CanvasBlockInstance @property {string} instanceId @property {string} blockId @property {string} variant @property {Record<string, unknown>} [props] */

/** @typedef {Object} CanvasLayoutData @property {CanvasKitRef} kitRef @property {'light'|'dark'} mode @property {'default'|'loading'|'empty'|'error'} previewState @property {'desktop'|'tablet'|'mobile'} viewport @property {CanvasBlockInstance[]} blocks */

/** @typedef {Object} SavedCanvasLayout @property {string} id @property {string} name @property {number} createdAt @property {number} updatedAt @property {CanvasLayoutData} data */

/** @typedef {Object} CanvasWorkspace @property {string} activeLayoutId @property {SavedCanvasLayout[]} layouts */

export const DEFAULT_LAYOUT_DATA = {
  kitRef: { source: 'curated', id: 'saas-clarity' },
  mode: 'light',
  previewState: 'default',
  viewport: 'desktop',
  blocks: [],
}

export function createLayoutId() {
  return `layout_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function createInstanceId() {
  return `inst_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/** @param {unknown} raw @returns {CanvasLayoutData} */
export function normalizeLayoutData(raw = {}) {
  const blocks = Array.isArray(raw.blocks)
    ? raw.blocks
        .filter((b) => b && b.blockId && b.instanceId)
        .map((b) => ({
          instanceId: b.instanceId,
          blockId: b.blockId,
          variant: isValidVariant(b.blockId, b.variant) ? b.variant : getDefaultVariant(b.blockId),
          props: normalizeBlockProps(b.blockId, b.props),
        }))
    : []

  return {
    kitRef: raw.kitRef?.id
      ? { source: raw.kitRef.source === 'custom' ? 'custom' : 'curated', id: raw.kitRef.id }
      : DEFAULT_LAYOUT_DATA.kitRef,
    mode: raw.mode === 'dark' ? 'dark' : 'light',
    previewState: isValidPreviewState(raw.previewState) ? raw.previewState : 'default',
    viewport: isValidViewport(raw.viewport) ? raw.viewport : 'desktop',
    blocks,
  }
}

/** @param {string} name @param {Partial<CanvasLayoutData>} [data] @returns {SavedCanvasLayout} */
export function createSavedLayout(name, data = {}) {
  const now = Date.now()
  return {
    id: createLayoutId(),
    name: name.trim() || 'Untitled canvas',
    createdAt: now,
    updatedAt: now,
    data: normalizeLayoutData({ ...DEFAULT_LAYOUT_DATA, ...data }),
  }
}

/** @param {CanvasBlockInstance[]} blocks @returns {CanvasBlockInstance[]} */
export function cloneBlocksWithNewIds(blocks) {
  return blocks.map((b) => ({
    instanceId: createInstanceId(),
    blockId: b.blockId,
    variant: b.variant,
    props: { ...normalizeBlockProps(b.blockId, b.props) },
  }))
}

/** @returns {CanvasWorkspace} */
function migrateLegacyLayout() {
  try {
    const raw = localStorage.getItem(LEGACY_LAYOUT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const layout = createSavedLayout('My canvas', parsed)
    localStorage.removeItem(LEGACY_LAYOUT_KEY)
    return { activeLayoutId: layout.id, layouts: [layout] }
  } catch {
    return null
  }
}

/** @returns {CanvasWorkspace} */
export function loadWorkspaces() {
  try {
    const raw = localStorage.getItem(WORKSPACES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const layouts = Array.isArray(parsed.layouts)
        ? parsed.layouts
            .filter((l) => l && l.id && l.name)
            .map((l) => ({
              id: l.id,
              name: String(l.name),
              createdAt: Number(l.createdAt) || Date.now(),
              updatedAt: Number(l.updatedAt) || Date.now(),
              data: normalizeLayoutData(l.data),
            }))
        : []
      if (layouts.length > 0) {
        const activeLayoutId = layouts.some((l) => l.id === parsed.activeLayoutId)
          ? parsed.activeLayoutId
          : layouts[0].id
        return { activeLayoutId, layouts }
      }
    }
  } catch {
    // fall through
  }

  const migrated = migrateLegacyLayout()
  if (migrated) return migrated

  const initial = createSavedLayout('Untitled canvas')
  return { activeLayoutId: initial.id, layouts: [initial] }
}

/** @param {CanvasWorkspace} workspace */
export function saveWorkspaces(workspace) {
  try {
    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspace))
  } catch {
    // ignore quota errors
  }
}

/** @param {CanvasWorkspace} workspace @param {string} layoutId @returns {CanvasWorkspace} */
export function switchActiveLayout(workspace, layoutId) {
  if (!workspace.layouts.some((l) => l.id === layoutId)) return workspace
  return { ...workspace, activeLayoutId: layoutId }
}

/** @param {CanvasWorkspace} workspace @param {string} [name] @returns {CanvasWorkspace} */
export function addNewLayout(workspace, name = 'Untitled canvas') {
  const layout = createSavedLayout(name)
  return {
    activeLayoutId: layout.id,
    layouts: [...workspace.layouts, layout],
  }
}

/** @param {CanvasWorkspace} workspace @returns {CanvasWorkspace} */
export function duplicateActiveLayout(workspace) {
  const active = workspace.layouts.find((l) => l.id === workspace.activeLayoutId)
  if (!active) return workspace
  const copy = createSavedLayout(`${active.name} (copy)`, {
    ...active.data,
    blocks: cloneBlocksWithNewIds(active.data.blocks),
  })
  return {
    activeLayoutId: copy.id,
    layouts: [...workspace.layouts, copy],
  }
}

/** @param {CanvasWorkspace} workspace @param {string} layoutId @param {string} name @returns {CanvasWorkspace} */
export function renameLayout(workspace, layoutId, name) {
  const trimmed = name.trim()
  if (!trimmed) return workspace
  return {
    ...workspace,
    layouts: workspace.layouts.map((l) =>
      l.id === layoutId ? { ...l, name: trimmed, updatedAt: Date.now() } : l
    ),
  }
}

/** @param {CanvasWorkspace} workspace @param {string} layoutId @returns {CanvasWorkspace} */
export function deleteLayout(workspace, layoutId) {
  if (workspace.layouts.length <= 1) return workspace
  const layouts = workspace.layouts.filter((l) => l.id !== layoutId)
  const activeLayoutId = workspace.activeLayoutId === layoutId ? layouts[0].id : workspace.activeLayoutId
  return { activeLayoutId, layouts }
}

/** @param {CanvasWorkspace} workspace @param {CanvasLayoutData} data @returns {CanvasWorkspace} */
export function replaceActiveLayoutData(workspace, data) {
  return {
    ...workspace,
    layouts: workspace.layouts.map((l) =>
      l.id === workspace.activeLayoutId
        ? { ...l, data: normalizeLayoutData(data), updatedAt: Date.now() }
        : l
    ),
  }
}

/** @param {CanvasWorkspace} workspace @param {(data: CanvasLayoutData) => CanvasLayoutData} updater @returns {CanvasWorkspace} */
export function updateActiveLayoutData(workspace, updater) {
  return {
    ...workspace,
    layouts: workspace.layouts.map((l) => {
      if (l.id !== workspace.activeLayoutId) return l
      const nextData = updater(l.data)
      return { ...l, data: normalizeLayoutData(nextData), updatedAt: Date.now() }
    }),
  }
}

/** @param {CanvasWorkspace} workspace @returns {SavedCanvasLayout|null} */
export function getActiveSavedLayout(workspace) {
  return workspace.layouts.find((l) => l.id === workspace.activeLayoutId) || null
}

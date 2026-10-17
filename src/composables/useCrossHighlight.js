import { ref } from 'vue'

// "Cross-filter" estilo Power BI: passar o mouse numa ferramenta (Stack,
// tags dos cases ou dos projetos) destaca tudo que usa a mesma ferramenta.
export const hoveredTool = ref('')

export const normTool = (s) => String(s).toLowerCase().replace(/[^a-z0-9+#]/g, '')

export function setHover(tool) {
    hoveredTool.value = tool ? normTool(tool) : ''
}

// para tags avulsas: 'match' | 'dim' | ''
export function tagState(tag) {
    if (!hoveredTool.value) return ''
    return normTool(tag) === hoveredTool.value ? 'match' : 'dim'
}

// para linhas/cards com várias tags
export function rowState(tags = []) {
    if (!hoveredTool.value) return ''
    return tags.some((t) => normTool(t) === hoveredTool.value) ? 'match' : 'dim'
}

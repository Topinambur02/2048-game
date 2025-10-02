export function getColor(number: number) {
    switch(number) {
        case 2:
            return '#EDE4DA'
        case 4:
            return '#ECE0C9'
        case 8:
            return '#F2B178'
        case 16:
            return '#F49663'
        case 32:
            return '#F67C5F'
        case 64:
            return '#F65E3B'
        case 128:
            return '#EDCF73'
        case 256:
            return '#EECC62'
        case 512:
            return '#EDC851'
        case 1024:
            return '#EEC43F'
        case 2048:
            return '#EDC22E'
        default:
            return '#CDC0B4'
    }
}
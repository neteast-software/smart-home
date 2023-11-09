export function hexToRgba(hex: string, opacity = 100) {
    const index = hex.indexOf('#');
    if (index > -1) hex = hex.slice(index + 1);
    if (hex.length == 3) {
        let newHex = '';
        for (let index = 0; index < hex.length; index++) {
            newHex += `${hex[index]}${hex[index]}`;
        }
        hex = newHex;
    }

    opacity = parseFloat((opacity / 100).toFixed(1));
    return `rgba(${parseInt('0x' + hex.slice(0, 2))}, ${parseInt('0x' + hex.slice(2, 4))}, ${parseInt(
        '0x' + hex.slice(4, 6)
    )}, ${opacity})`;
}
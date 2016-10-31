import {MapOf} from '../utils/map'

export const Tools: MapOf<(r1: Mithril.Property<string>,
    r2: Mithril.Property<string>, r3: Mithril.Property<string>,
    res: Mithril.Property<string>) => void> = {
  mov2r: () => {},
  lsl2ri: (r1, r2, r3, res) => {
    if (!r1() || !r2() || !r3()) {
      return;
    }
    res(lsl(r1(), r2(), r3()))
  },
  lsr2ri: () => {},
  cmp2r: () => {},
  bl2offs: (r1, r2, r3, res) => {
    if (!r1() || !r2()) {
      return;
    }
    res(offset2bl(r1(), r2()))
  }

}

function lsl(rd: string, rs: string, imm: string) {
  let b_imm = padtrim(parseInt(imm, 10).toString(2), 5),
      b_rd = padtrim(parseInt(rd[1], 10).toString(2), 3),
      b_rs = padtrim(parseInt(rs[1], 10).toString(2), 3),
      hibyte = `00000${b_imm.substr(0,3)}`,
      lobyte = `${b_imm.substr(3)}${b_rs}${b_rd}`

  return `${binToHexByte(lobyte)}${binToHexByte(hibyte)}`
}

function offset2bl(destHex: string, srcHex: string) {
  /**
   *  for the BL/X instruction, the PC moves +4 first because the whole
   *  instruction is 4 bytes wide AND THEN jumps [offset * 2] bytes
   */
	let dest = parseInt(destHex, 16),
			src = parseInt(srcHex, 16),
			offset = dest - src,
			corrected_offset = (offset - 4) / 2,
			sign = corrected_offset < 0 ? 1 : 0,
			unsigned_corrected_offset = sign ? corrected_offset >>> 0 : corrected_offset,
			bin_offset = padtrim(unsigned_corrected_offset.toString(2), 21),
			imm1 = bin_offset.substr(0, 10),
			imm2 = bin_offset.substr(10),
			hiword_hibyte = `11110${sign}${imm1.substr(0,2)}`,
			hiword_lobyte = `${imm1.substr(2)}`,
			loword_hibyte = `11111${imm2.substr(0,3)}`,
			loword_lobyte = `${imm2.substr(3)}`

	// little endian
	return `${binToHexByte(hiword_lobyte)}${binToHexByte(hiword_hibyte)}` +
		`${binToHexByte(loword_lobyte)}${binToHexByte(loword_hibyte)}`
}

function padtrim(n:string, width: number, z: string = '0') {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n.substr(n.length - width) : new Array(width - n.length + 1).join(z) + n;
}

function binToHexByte(bin: string) {
  return padtrim(parseInt(bin, 2).toString(16), 2)
}
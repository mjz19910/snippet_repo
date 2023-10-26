export function deno_default_open(filename) {
  return Deno.open(filename, {
    read: true,
    write: true,
    create: true,
  });
}

/** @arg {Deno.FsFile} file */
export async function read_entire_file(file) {
  await file.seek(0, 0);
  let buf = new Uint8Array(0);
  const tmp_buf = new Uint8Array(1024 * 8);
  do {
    const n = await file.read(tmp_buf);
    if (n === null) break;
    const prev_end = buf.length;
    const prev_data = buf;
    buf = new Uint8Array(prev_end + n);
    buf.set(prev_data, 0);
    buf.set(tmp_buf.slice(0, n), prev_end);
  } while (true);
  return new TextDecoder().decode(buf);
}
/** @arg {Deno.FsFile} file @arg {any} obj */
export async function write_entire_file(file, obj) {
  const data = JSON.stringify(obj, void 0, "\t");
  await file.seek(0, 0);
  const encoder = new TextEncoder();
  const buf = encoder.encode(data);
  const n_written = await file.write(buf);
  if (n_written !== buf.length) {
    await file.truncate(n_written);
    throw new Error("partial write");
  }
  await file.truncate(buf.length);
}
/** @template T @arg {Deno.FsFile} file @returns {Promise<T[]>} */
export async function read_json_array_file(file) {
  const data = await read_entire_file(file);
  if (data === "") return [];
  return JSON.parse(data);
}

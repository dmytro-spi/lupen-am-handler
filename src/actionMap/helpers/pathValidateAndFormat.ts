const pathValidateAndFormat = (path?: string, chainLength?: number): string => {
  if (!path) {
    return '';
  }

  const symbols = path.match(/[^\.a-zA-Z0-9\[\]]/g);
  if (symbols) {
    throw new Error(`Invalid symbols in path: ${path}`);
  }

  if (path[0] === '.') {
    return path.slice(1);
  }

  if (chainLength && path.split('.').length !== chainLength) {
    throw new Error(`Invalid path length: ${path}`);
  }

  return path;
}

export default pathValidateAndFormat;

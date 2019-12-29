export interface WinPositions {
  winY: number,
  winBottom: number
}

export function getCollection(selector, container: any = document): Element[] {
  return Array.from(container.querySelectorAll(selector));
}

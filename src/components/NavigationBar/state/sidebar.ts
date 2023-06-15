import {atom} from "jotai";

export function atomWithToggle(
  initialValue?: boolean
) {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom)
    set(anAtom, update)
  })
  
  return anAtom
}

export const sidebarAtom = atomWithToggle(true);


export const activeSidebarItemLevel1Atom = atom("");
export const activeSidebarItemLevel2Atom = atom("");
export const activePopupAtom = atom("");

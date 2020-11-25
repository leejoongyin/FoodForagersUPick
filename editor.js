import * as React from 'react'
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { Value } from "slate";
import { value, setValue } from './slate_init';


export default function syncEditor() {
    const editor = useMemo(() => withReact(createEditor()), []);


    return (
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => setValue(newValue)}
        >
          <Editable />
        </Slate>
    )
}

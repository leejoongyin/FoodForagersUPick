import { Value } from 'slate';
import React, { useEffect, useMemo, useState } from 'react'

export const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])
import Board from "@/assets/components/Board"
import { render } from "@testing-library/react"
import React from "react"

describe('Board', () => {
    test('renders without crashing', () => {
        render(<Board board={[]} />)
    })
})
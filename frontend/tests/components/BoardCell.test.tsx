import BoardCell from "@/assets/components/BoardCell"
import { render } from "@testing-library/react"
import React from "react"

describe('BoardCell', () => {
    test('renders without crashing', () => {
        render(<BoardCell />)
    })
})
import React from "react"
import { render } from "@testing-library/react"
import { AuthProvider } from "@/assets/provider/AuthProvider"

describe('AuthProvider', () => {
    test('renders without crashing', () => {
        render(<AuthProvider children={undefined} />)
    })
})
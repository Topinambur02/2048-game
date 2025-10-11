import Settings from "@/assets/components/Settings"
import { render } from "@testing-library/react"
import React from "react"

describe('Settings', () => {
    test('renders without crashing', () => {
        render(
            <Settings
                onPress={() => { }}
            />
        )
    })
})
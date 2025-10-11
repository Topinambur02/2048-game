import SettingsModal from "@/assets/components/SettingsModal"
import { render } from "@testing-library/react"
import React from "react"

describe('SettingsModal', () => {
    test('renders without crashing', () => {
        render(
            <SettingsModal
                showSettingsModal={false}
                setShowSettingsModal={() => { }}
            />
        )
    })
})
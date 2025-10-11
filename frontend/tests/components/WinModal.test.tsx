import WinModal from "@/assets/components/WinModal"
import { render } from "@testing-library/react"
import React from "react"

describe('WinModal', () => {
    test('renders without crashing', () => {
        render(
            <WinModal
                showWinModal={false}
                setShowWinModal={() => { }}
                initializeBoard={() => { }}
                onClose={() => { }}
            />
        )
    })
})
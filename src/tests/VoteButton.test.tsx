import { render, screen } from '@testing-library/react'
import VoteButton from '../components/VoteButton'
import userEvent from '@testing-library/user-event'


describe('group', () => {
    it('should run on click', async() => {
        const mockfunc = vi.fn()
        render(<VoteButton score={1} onVote={mockfunc}/>)
        const plus = screen.getByAltText('plus')
        const minus = screen.getByAltText('minus')
        await userEvent.click(plus)
        expect(mockfunc).toHaveBeenCalled()
        await userEvent.click(minus)
        expect(mockfunc).toHaveBeenCalled()
    })

    it('should show the score', async() => {
        render(<VoteButton score={1} onVote={vi.fn()}/>)
        const score = screen.getByTestId('voting-score')
        expect(score).toBeInTheDocument()
    })


})
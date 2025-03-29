import { render, screen } from '@testing-library/react'
import App from '../App'
import { sampleComment } from './comment.test'
import userEvent from '@testing-library/user-event'


vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'comments') {
        return JSON.stringify([sampleComment])
    }
    else if (key === 'user') {
        return JSON.stringify(sampleComment.user)
    }
    return null
}) // this is for the local storage fetches
describe('App', () => {
    it('should upvote and downvote', async() => {
        render(<App />)

        const pluses = screen.getAllByAltText('plus') //there would be twoo pluses due to the data provided
        const minuses = screen.getAllByAltText('minus')
        const scores = screen.getAllByTestId('voting-score')
        await userEvent.click(pluses[0])
        expect(scores[0]).toHaveTextContent((sampleComment.score + 1).toString())
        await userEvent.click(minuses[0])
        expect(scores[0]).toHaveTextContent(sampleComment.score.toString())
    })

    it('should add a new comment', async() => {
        render(<App />)

        const replyButton = screen.getByRole('link', { name: /Reply/i })
        await userEvent.click(replyButton)
        const replyForm = screen.getByRole('textbox')
        const finalReply = screen.getByRole('button', { name: /Reply/i })
        await userEvent.type(replyForm, 'skelebe')
        await userEvent.click(finalReply)
        expect(replyForm).not.toBeInTheDocument()
        expect(screen.getByText('skelebe')).toBeInTheDocument()
        
    })

    it('should edit a comment', async() => {
        render(<App />)

        const prevContent = screen.getByText(sampleComment.content)
        const editButton = screen.getByRole('button', { name: /Edit/i })
        await userEvent.click(editButton)
        const editForm = screen.getByRole('textbox')
        const finalEdit = screen.getByRole('button', { name: /Update/i })
        await userEvent.clear(editForm) //first clear the textbox
        await userEvent.type(editForm, 'updated comment')
        await userEvent.click(finalEdit)
        expect(editForm).not.toBeInTheDocument()
        expect(screen.getByText('updated comment')).toBeInTheDocument()
        expect(prevContent).not.toBeInTheDocument()
    })

    it('should delete a comment', async() => {
        render(<App />)


        const content = screen.getByText(sampleComment.content)
        const deleteButton = screen.getByRole('button', { name: /Delete/i })
        await userEvent.click(deleteButton)
        const finalDelete = screen.getByRole('button', { name: /Yes/i })
        await userEvent.click(finalDelete)
        expect(content).not.toBeInTheDocument()
    })
})
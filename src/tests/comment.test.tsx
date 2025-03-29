import { render, screen } from '@testing-library/react'
import Comment from '../components/Comment'
import { CommentProps } from '../App'
import userEvent from '@testing-library/user-event'

const sampleComment : CommentProps = {
    id: 1,
    content: 'comment content',
    createdAt: 'comment date',
    score: 1,
    user: {
        image: {
            png: 'png',
            webp: 'webp'
        },
        username: 'username1'
    },
    replies: [
        {
            id: 2,
            content: 'reply content',
            createdAt: 'reply date',
            score: 1,
            replyingTo: 'username',
            user: {
                image: {
                    png: 'png',
                    webp: 'webp'
                },
                username: 'username2'
            }
        }
    ],
    replyingTo: 'username'
}
vitest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(sampleComment.user))

describe('Comment', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    
    it('should render comment content, profile, and username', () => {
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
            }/>)
            
        const content = screen.getByText(sampleComment.content)
        const profile = screen.getByAltText(sampleComment.user.username)
        const username = screen.getByRole('heading', {name: sampleComment.user.username})
        expect(content).toBeInTheDocument()
        expect(profile).toBeInTheDocument()
        expect(username).toBeInTheDocument()
    })

    it('should render comment replies', () => {
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
            }/>)
        
        const reply = screen.getByText(sampleComment.replies![0].content)
        expect(reply).toBeInTheDocument()
    })

    it('should render edit, reply and delete button', () => {
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
            }/>)
        

        const editButton = screen.getByRole('button', { name: /Edit/i })
        const deleteButton = screen.getByRole('button', { name: /Delete/i })
        const replyButton = screen.getByRole('link', { name: /Reply/i })
        expect(editButton).toBeInTheDocument()
        expect(deleteButton).toBeInTheDocument()
        expect(replyButton).toBeInTheDocument()
    })

    it('should render edit form', async() => {
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
            }/>)
        
        const editButton = screen.getByRole('button', { name: /Edit/i })
        await userEvent.click(editButton)
        const editForm = screen.getByRole('textbox')
        expect(editForm).toBeInTheDocument()
        expect(editForm).toHaveAttribute('placeholder', 'Update Comment')
    })

    it('should render reply form', async() => {
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
        }/>)

        const replyButton = screen.getByRole('link', { name: /Reply/i })
        await userEvent.click(replyButton)
        const replyForm = screen.getByRole('textbox')
        expect(replyForm).toBeInTheDocument()
        expect(replyForm).toHaveAttribute('placeholder', 'Add Comment')

    })

    it('should upvote and downvote', async() => {
        const mockVoteComment = vi.fn()
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={mockVoteComment} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
        }/>)

        const pluses = screen.getAllByAltText('plus') //there would be twoo pluses due to the data provided
        const minuses = screen.getAllByAltText('minus')
        // for (const plus of pluses) {
        //     await userEvent.click(plus)
        //     expect(mockVoteComment).toHaveBeenCalledWith(sampleComment.id, 'up')
        // }
        await userEvent.click(pluses[0])
        expect(mockVoteComment).toHaveBeenCalledWith(sampleComment.id, 'up')
        vi.clearAllMocks()
        await userEvent.click(pluses[1])
        expect(mockVoteComment).toHaveBeenCalledWith(sampleComment.replies![0].id, 'up')

        await userEvent.click(minuses[0])
        expect(mockVoteComment).toHaveBeenCalledWith(sampleComment.id, 'down')
        vi.clearAllMocks()
        await userEvent.click(minuses[1])
        expect(mockVoteComment).toHaveBeenCalledWith(sampleComment.replies![0].id, 'down')

    })

    it('should delete comment if yes and should not if no', async() => {
        const mockDeleteComment = vi.fn()
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={mockDeleteComment} 
            editComment={vi.fn()
        }/>)

        const deleteButton = screen.getByRole('button', { name: /Delete/i })
        await userEvent.click(deleteButton)
        const finalDelete = screen.getByRole('button', { name: /Yes/i })
        await userEvent.click(finalDelete)
        expect(mockDeleteComment).toHaveBeenCalledWith(sampleComment.id)
        await userEvent.click(deleteButton)
        const cancelDelete = screen.getByRole('button', { name: /No/i })
        await userEvent.click(cancelDelete)
        expect(cancelDelete).not.toBeInTheDocument() //modal would close
    })

    it('should edit comment', async() => {
        const mockEditComment = vi.fn()
        render(<Comment 
            comment={sampleComment} 
            addComment={vi.fn()} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={mockEditComment}
        />)

        const editButton = screen.getByRole('button', { name: /Edit/i })
        await userEvent.click(editButton)
        const editForm = screen.getByRole('textbox')
        const finalEdit = screen.getByRole('button', { name: /Update/i })
        await userEvent.clear(editForm) //first clear the textbox
        await userEvent.type(editForm, 'updated comment')
        await userEvent.click(finalEdit)
        expect(mockEditComment).toHaveBeenCalledWith(sampleComment.id, 'updated comment')
    })

    it('should add a new comment', async() => {
        const mockAddComment = vi.fn()
        render(<Comment 
            comment={sampleComment} 
            addComment={mockAddComment} 
            voteComment={vi.fn()} 
            deleteComment={vi.fn()} 
            editComment={vi.fn()
        }/>)

        const replyButton = screen.getByRole('link', { name: /Reply/i })
        await userEvent.click(replyButton)
        const replyForm = screen.getByRole('textbox')
        const finalReply = screen.getByRole('button', { name: /Reply/i })
        await userEvent.type(replyForm, 'new comment')
        await userEvent.click(finalReply)
        expect(mockAddComment).toHaveBeenCalledWith(sampleComment.replies![0].id, 'new comment', sampleComment.replies![0].user.username)
    })

})


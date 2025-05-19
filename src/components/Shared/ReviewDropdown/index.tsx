import { Pencil, Trash } from 'phosphor-react'
import { Dropdown, DropdownButton, DropdownItem } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DeleteModal } from '../DeleteModal'
import * as Dialog from '@radix-ui/react-dialog'
import { RefObject } from 'react'
import { ReviewProps } from '@/types/review'

interface Props {
  review: ReviewProps
  buttonRef: RefObject<HTMLButtonElement>
  dropdownRef: RefObject<HTMLDivElement>
  isDropdownOpen: boolean
  isDeleteModalOpen: boolean
  handleDeleteReview: () => void
  handleSetIsDropdownOpen: (value: boolean) => void
  handleSetIsDeleteModalOpen: (value: boolean) => void
  handleSetIsRatingCardFormOpen: (value: boolean) => void
  handleSetReviewToEdit: (review: ReviewProps) => void
}

export const ReviewDropdown = ({
  review,
  buttonRef,
  isDeleteModalOpen,
  isDropdownOpen,
  dropdownRef,
  handleDeleteReview,
  handleSetIsDropdownOpen,
  handleSetIsDeleteModalOpen,
  handleSetIsRatingCardFormOpen,
  handleSetReviewToEdit,
}: Props) => {
  return (
    <>
      <DropdownButton
        ref={buttonRef}
        onClick={() => handleSetIsDropdownOpen(true)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </DropdownButton>
      {isDropdownOpen && (
        <Dropdown ref={dropdownRef}>
          <Dialog.Root
            open={isDeleteModalOpen}
            onOpenChange={handleSetIsDeleteModalOpen}
          >
            <Dialog.Trigger asChild>
              <DropdownItem
                onClick={() => {
                  handleSetIsDeleteModalOpen(true)
                }}
              >
                <Trash className="delete_icon" />
                <p className="delete_icon">Delete Review</p>
              </DropdownItem>
            </Dialog.Trigger>
            <DeleteModal
              onConfirm={() => {
                handleDeleteReview()
              }}
              onClose={() => {
                handleSetIsDeleteModalOpen(false)
                handleSetIsDropdownOpen(false)
              }}
            />
          </Dialog.Root>
          <DropdownItem
            onClick={() => {
              handleSetReviewToEdit(review)
              handleSetIsRatingCardFormOpen(true)
              handleSetIsDropdownOpen(false)
            }}
          >
            <Pencil className="edit_icon" />
            <p className="edit_icon">Edit Review</p>
          </DropdownItem>
        </Dropdown>
      )}
    </>
  )
}

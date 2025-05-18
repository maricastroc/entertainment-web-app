/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Dialog from '@radix-ui/react-dialog'
import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Button } from '@/components/Core/Button'
import { ButtonGroup, CropperWrapper } from './styles'
import { ModalContent, ModalOverlay } from '@/styles/shared'

interface ImageCropperProps {
  src: string
  onCrop: (croppedImage: string) => void
  aspectRatio?: number
  onClose: () => void
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  onClose,
  src,
  onCrop,
  aspectRatio = 1,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null)

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = (cropperRef.current as any).cropper
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 2048,
        maxHeight: 2048,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      })

      onCrop(croppedCanvas.toDataURL())
    }
  }

  return (
    <Dialog.Portal>
      <ModalOverlay hasOverlay={false}>
        <ModalContent>
          <CropperWrapper>
            <Cropper
              src={src}
              style={{ height: '100%', width: '100%' }}
              initialAspectRatio={aspectRatio}
              aspectRatio={aspectRatio}
              guides={true}
              ref={cropperRef}
            />
          </CropperWrapper>
          <ButtonGroup>
            <Button
              content="Cancel"
              variant="outline-white"
              onClick={() => {
                onClose()
              }}
            />
            <Button
              variant="solid-white"
              content="Crop Image"
              onClick={handleCrop}
            />
          </ButtonGroup>
        </ModalContent>
      </ModalOverlay>
    </Dialog.Portal>
  )
}

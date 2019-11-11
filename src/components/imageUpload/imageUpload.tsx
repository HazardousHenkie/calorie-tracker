import React from 'react'

import { withFirebase, FirebaseProviderProps } from '../firebase'

import FileUploader from 'react-firebase-file-uploader'

const ImageUpload: React.FC<FirebaseProviderProps> = ({ firebase }) => {
  const handleUploadSuccess = (filename: string): void => {
    firebase
      .getImagesStorage()
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
      })
    console.log(filename)
  }

  const handleUploadError = (): void => {
    console.log('error')
  }

  return (
    <div className="image_upload">
      <label>
        Upload Image
        <FileUploader
          hidden
          accept="image/*"
          storageRef={firebase.getImagesStorage()}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
        />
      </label>
    </div>
  )
}

export default withFirebase(ImageUpload)

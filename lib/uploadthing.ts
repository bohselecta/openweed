import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  // License upload endpoint
  licenseUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Add any authentication/authorization logic here
      return { userId: 'temp-user-id' }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('File URL:', file.url)
      
      return { uploadedBy: metadata.userId }
    }),
    
  // Product image upload endpoint
  productImageUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      // Add authentication logic here
      return { userId: 'temp-user-id' }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Product image uploaded:', file.url)
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

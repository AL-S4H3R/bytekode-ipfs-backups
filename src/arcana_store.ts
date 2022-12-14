// @ts-ignore
import { StorageProvider } from '@arcana/storage/dist/standalone/storage.umd.js'
import { ethers } from 'ethers'
import { config} from 'dotenv'

config()

const dappStorageProvider = new StorageProvider({
    appId: 1876,
    provider: new ethers.providers.AlchemyProvider(process.env.ALCHEMY_API_KEY as string),
    email: 'shlok@bytekode.xyz'
})
// const uploader = dappStorageProvider.getUploader()
console.log(dappStorageProvider)


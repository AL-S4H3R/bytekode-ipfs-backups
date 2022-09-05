import { config } from 'dotenv'
import { S3 } from 'aws-sdk'
import { schedule } from 'node-cron'

config()

const API_URL = `https://s3.filebase.com`
const FILEBASE_ACCESS_KEY = process.env.FILEBASE_ACCESS_KEY as string
const FILEBASE_SECRET_KEY = process.env.FILEBASE_SECRET_KEY as string

const awsClient = new S3({
    signatureVersion: 'v4',
    endpoint: API_URL,
    credentials: {
        accessKeyId: FILEBASE_ACCESS_KEY,
        secretAccessKey: FILEBASE_SECRET_KEY
    }
})

const listAllBuckets = async () => {
    awsClient.listBuckets((err, data) => {
        console.log(data.Buckets![0]['Name'])
    })
}

const uploadToBucket = async (filename: string) => {
    awsClient.putObject({
        Bucket: 'bytekode-test-bucket',
        Key: `contracts/${filename}`,
        Body: 'Test',
        ContentType: 'text/plain'
    }, (err, data) => {
        console.log(data)
    })
}

uploadToBucket('TestContract')
// runs every minute
// schedule('* * * * 1', () => console.log('Running'))
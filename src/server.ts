import { config } from 'dotenv'
import { S3 } from 'aws-sdk'
import { schedule } from 'node-cron'
import { createClient } from '@supabase/supabase-js'

config()

const API_URL = `https://s3.filebase.com`
const FILEBASE_ACCESS_KEY = process.env.FILEBASE_ACCESS_KEY as string
const FILEBASE_SECRET_KEY = process.env.FILEBASE_SECRET_KEY as string
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY as string 

const awsClient = new S3({
    signatureVersion: 'v4',
    endpoint: API_URL,
    credentials: {
        accessKeyId: FILEBASE_ACCESS_KEY,
        secretAccessKey: FILEBASE_SECRET_KEY
    }
})

const supabaseClient = createClient(
    'https://qclfibrjrwjhidgbtgym.supabase.co',
    SUPABASE_SECRET_KEY    
)

// schedule('* * * * 1', () => console.log('Running'))
const contractsBackup = async () => {
    const { data: contracts, error: conErr } = await supabaseClient.from('contracts').select('*')
    contracts && console.log(JSON.stringify(contracts))
    // upload contract data to ipfs.
    if(!conErr){
        awsClient.putObject({
            Bucket: 'bytekode-test-bucket',
            Key: `contracts/${Date.now()}`,
            Body: JSON.stringify(contracts),
            ContentType: 'application/json'
        }, (err, data) => {
            err && console.log('Error uploading contracts to IPFS')
            console.log(data)
        })
    }
}

const historiesBackup = async () => {
    const { data: history, error: conErr } = await supabaseClient.from('history').select('*')
    history && console.log(JSON.stringify(history))
    // upload history data to ipfs.
    if(!conErr){
        awsClient.putObject({
            Bucket: 'bytekode-test-bucket',
            Key: `history/${Date.now()}`,
            Body: JSON.stringify(history),
            ContentType: 'application/json'
        }, (err, data) => {
            err && console.error('Error uploading history to IPFS')
            console.log(data)
        })
    }
}

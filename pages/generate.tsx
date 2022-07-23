import { DatePicker } from '@mantine/dates'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const Generate: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google')
    },
  })
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)
  const [trend, setTrend] = useState('')
  const [headline, setHeadline] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [ipfsImageUrl, setIpfsImageUrl] = useState('')
  const [ipfsImageHash, setIpfsImageHash] = useState('')
  const [ipfsImageTimestamp, setIpfsImageTimestamp] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const promptFlags =
    ' :: 16-bit:: 7 Segment Display:: volumetric Light:: Plasma:: watermark::-0.3 blurry::-0.3 cropped::-0.3 --test --video'
  const [promptDate, setPromptDate] = useState(dayjs().subtract(1, 'days').toDate())

  const generatePrompt = async () => {
    setIsGeneratingPrompt(true)

    const generatePromptReq = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/generate/prompt?date=${dayjs(promptDate).format('YYYY-MM-DD')}`,
    )

    const generatePrompt = await generatePromptReq.json()

    setTrend(generatePrompt.trend)
    setHeadline(generatePrompt.headline)
    setPrompt(generatePrompt.prompt)
    setIsGeneratingPrompt(false)
  }

  const uploadImage = async () => {
    setIsUploadingImage(true)
    const uploadImageReq = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/generate/upload?imageUrl=${imageUrl}&trend=${trend.replace(/\s/g, '')}&date=${dayjs(
          promptDate,
        ).format('YYYY-MM-DD')}`,
    )

    const uploadImage = await uploadImageReq.json()

    setIpfsImageHash(uploadImage.pinataHash)
    setIpfsImageTimestamp(uploadImage.pinataTimestamp)
    setIpfsImageUrl(`https://metawallet.mypinata.cloud/ipfs/${uploadImage.pinataHash}`)
    setIsUploadingImage(false)
  }

  const mintNft = async () => {
    setIsMinting(true)
    const mintNftResponse = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/generate/mint?date=${dayjs(promptDate).format(
          'YYYY-MM-DD',
        )}&trend=${trend}&headline=${headline}&prompt=${prompt}&ipfsImageHash=${ipfsImageHash}&ipfsImageTimestamp=${ipfsImageTimestamp}`,
    )
    const data = await mintNftResponse.json()

    console.log(data)
    setIsMinting(false)
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  const signOutHandler = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` })
  }

  return (
    <>
      <Head>
        <title>Zeitgesit Admin - Generate</title>
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen px-4 py-12">
        <div className="flex items-center justify-between w-full pr-4 mb-16">
          <h1 className="text-4xl font-bold">The ZeitGeist Admin</h1>
          <button
            onClick={signOutHandler}
            className={clsx('text-white px-8 py-2 bg-blue-500 rounded-md')}
          >
            Sign Out
          </button>
        </div>

        <div className="w-full max-w-6xl mx-auto text-lg">
          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">Step 1</h2>
            <p>Click to generate the prompt of the day.</p>
            <div className="flex flex-row gap-4 mt-16">
              <button
                onClick={generatePrompt}
                className={clsx(
                  'px-8 py-2 bg-blue-500 rounded-md',
                  isGeneratingPrompt ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white',
                )}
                disabled={isGeneratingPrompt}
              >
                {isGeneratingPrompt ? 'Generating...' : 'Generate'}
              </button>

              <DatePicker
                classNames={{
                  input: 'h-12',
                }}
                clearable={false}
                value={promptDate}
                minDate={dayjs().subtract(29, 'days').toDate()}
                maxDate={dayjs().toDate()}
                onChange={(value) =>
                  value ? setPromptDate(value) : setPromptDate(dayjs().subtract(1, 'days').toDate())
                }
              />
            </div>

            <div className="w-1/2 mt-8">
              <div className="mb-4">
                <label htmlFor="trend" className="block text-sm font-bold text-gray-700">
                  Trend
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="trend"
                    id="trend"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Trend will be added here once generated"
                    disabled
                    value={trend}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="headline" className="block text-sm font-bold text-gray-700">
                  Headline
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="headline"
                    id="headline"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Headline will be added here once generated"
                    disabled
                    value={headline}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-bold text-gray-700">
                  Prompt
                </label>
                <div className="mt-1">
                  <textarea
                    name="prompt"
                    id="prompt"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Prompt will be added here once generated"
                    rows={6}
                    disabled
                    value={prompt}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">Step 2</h2>

            <p>Paste this into Discord.</p>

            <div className="p-6 mt-8 text-base text-gray-400 border-b rounded-lg border-slate-700 bg-slate-800">
              <code>
                <>
                  {prompt
                    ? `/imagine ${prompt + promptFlags}`
                    : 'Prompt will be added here once generated'}
                </>
              </code>
            </div>
          </div>

          <div className="text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">Step 3</h2>

            <p>Copy image URL and paste below.</p>

            <div className="my-8">
              <label htmlFor="headline" className="block text-sm font-bold text-gray-700">
                Image URL
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  name="headline"
                  id="headline"
                  className="block w-full px-4 py-2 border border-r-0 border-gray-300 shadow-sm rounded-tl-md rounded-bl-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={isUploadingImage}
                  placeholder="https://cdn.discordapp.com/..."
                  onChange={(e) => setImageUrl(e.currentTarget.value)}
                />
                <button
                  className={clsx(
                    'px-8 py-2 rounded-tr-md rounded-br-md',
                    isUploadingImage ? 'bg-gray-200 text-gray-400' : 'text-white bg-blue-500',
                  )}
                  onClick={uploadImage}
                  disabled={isUploadingImage}
                >
                  {isUploadingImage ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">Step 4</h2>
            <p>Check everything below and click to mint todays NFT.</p>

            <div className="p-8 my-8 text-gray-500 bg-gray-50">
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">Trend</span>
                <p>{trend || 'Trend will be added here once generated'}</p>
              </div>
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">Headline</span>
                <p>{headline || 'Headline will be added here once generated'}</p>
              </div>
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">Prompt</span>
                <p>{prompt || 'Headline will be added here once generated'}</p>
              </div>
              <div className="flex flex-col">
                <span className="block text-sm font-bold text-gray-900">Image</span>
                {!ipfsImageUrl && <p>Image will be added here once uploaded</p>}
                {ipfsImageUrl && (
                  <div className="h-[500px] mt-2">
                    <Image
                      src={ipfsImageUrl}
                      alt="The days generated image"
                      width={500}
                      height={500}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              className="px-8 py-2 my-4 font-bold text-white bg-teal-500 rounded-md"
              onClick={mintNft}
              disabled={isMinting}
            >
              Mint todays Zeitgeist NFT!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Generate

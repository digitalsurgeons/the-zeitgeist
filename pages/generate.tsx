import { NextPage } from 'next'
import Head from 'next/head'

const Generate: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zeitgesit Admin - Generate</title>
      </Head>
      <div className="flex flex-col items-center w-screen min-h-screen px-4 py-12">
        <h1 className="mb-16 text-4xl font-bold">The ZeitGeist Admin</h1>

        <div className="w-full max-w-6xl mx-auto text-lg">
          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">
              Step 1
            </h2>
            <p>Click to generate the prompt of the day.</p>
            <button className="px-8 py-2 my-4 text-white bg-blue-500 rounded-md">
              Generate
            </button>

            <div className="w-1/2 mt-8">
              <div className="mb-4">
                <label
                  htmlFor="trend"
                  className="block text-sm font-bold text-gray-700">
                  Trend
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="trend"
                    id="trend"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Trend will be added here once generated"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headline"
                  className="block text-sm font-bold text-gray-700">
                  Headline
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="headline"
                    id="headline"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Headline will be added here once generated"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="prompt"
                  className="block text-sm font-bold text-gray-700">
                  Prompt
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="prompt"
                    id="prompt"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Prompt will be added here once generated"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">
              Step 2
            </h2>

            <p>Paste this into Discord.</p>

            <div className="p-6 mt-8 text-base text-gray-400 border-b rounded-lg border-slate-700 bg-slate-800">
              <code>
                /imagine Prompt will be added here once generated :: 3D::
                volumetric light --style Octane render --test
              </code>
            </div>
          </div>

          <div className="text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">
              Step 3
            </h2>

            <p>Copy image URL and paste below.</p>

            <div className="my-8">
              <label
                htmlFor="headline"
                className="block text-sm font-bold text-gray-700">
                Image URL
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  name="headline"
                  id="headline"
                  className="block w-full px-4 py-2 border border-r-0 border-gray-300 shadow-sm rounded-tl-md rounded-bl-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button className="px-8 py-2 text-white bg-blue-500 rounded-tr-md rounded-br-md">
                  Upload
                </button>
              </div>
            </div>
          </div>

          <div className="mb-16 text-left">
            <h2 className="pb-1 mb-4 text-2xl font-bold border-b border-zinc-400">
              Step 4
            </h2>
            <p>Check everything below and click to mint todays NFT.</p>

            <div className="p-8 my-8 text-gray-500 bg-gray-50">
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">Trend</span>
                <p>Trend will be added here once generated</p>
              </div>
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">
                  Headline
                </span>
                <p>Headling will be added here once generated</p>
              </div>
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-900">Prompt</span>
                <p>Prompt will be added here once generated</p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-900">Image</span>
                <p>Image will be added here once uploaded</p>
              </div>
            </div>

            <button className="px-8 py-2 my-4 font-bold text-white bg-teal-500 rounded-md">
              Mint todays Zeitgeist NFT!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Generate

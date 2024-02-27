'use client'

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDebounce } from "@uidotdev/usehooks";
import algoliasearch from 'algoliasearch/lite';
import Modal from 'react-modal';
import { InstantSearch, Hits, Configure, Highlight, useSearchBox, Snippet } from 'react-instantsearch';


import { PARTY } from '@/consts';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

function Hit({ hit }) {

  return (
    <Link className="bg-white hover:bg-gray-100 w-full text-sm flex flex-row p-2 px-4 mb-3 rounded-lg shadow-md items-center" href={hit.urlPath}>
      <div className="flex grow flex-col">
        <div className="hit-section font-bold">
          <Highlight attribute="data.section" hit={hit} />
        </div>
        <div className="text-gray-600 hit-sub_section">
          <Highlight attribute="data.sub_section" hit={hit} />
        </div>
        <div className="hit-content">
          <Snippet hit={hit} attribute="content" />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </Link>
  );
}

const SearchResults = ({ show }) => {
  if (!show) return;

  return (
    <div className="mt-6 w-full overflow-y-auto max-h-dvh pb-72 px-4">
      <Hits hitComponent={Hit} />
    </div>
  )
}

const MIN_VALUE_LENGTH = 3

const SearchBox = ({ className, onFocus, onChange }) => {
  const { query, refine, clear } = useSearchBox()
  const [value, setValue] = useState(query)
  const debouncedInput = useDebounce(value, 300);

  const handleChange = useCallback(
    (e) => {
      const incomingValue = e.target.value
      if (incomingValue !== value) {
        setValue(incomingValue)
      }
    },
    [value],
  )

  useEffect(() => {
    if (debouncedInput.length >= MIN_VALUE_LENGTH) {
      refine(debouncedInput)
    } else if (debouncedInput.length < MIN_VALUE_LENGTH) {
      clear()
    }
    onChange(debouncedInput)
  }, [debouncedInput, refine, clear])

  return (
    <form className="mx-auto max-w-sm">
      <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </div>
        <input
          className="shadow-xl bg-white border h-14 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          type="text"
          placeholder="Pesquisar..."
          aria-label="Search"
          onChange={handleChange}
          value={value}
          onFocus={onFocus}
        />
      </div>
    </form>
  )
}

function ModalContent() {
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)

  return (
    <div className="">
      <InstantSearch searchClient={searchClient} indexName={PARTY}>
        <Configure attributesToSnippet={['content']} />
        <SearchBox
          onChange={query => setQuery(query)}
          onFocus={() => setFocus(true)}
          hasFocus={hasFocus}
        />
        <SearchResults show={query && query.length >= MIN_VALUE_LENGTH && hasFocus} />
      </InstantSearch>
    </div>
  )
}

function SearchIcon({ handleClick }) {
  return (
    <div className="fixed top-4 right-4 ">
      <button onClick={handleClick} className="bg-transparent hover:bg-black font-bold hover:text-white py-2 px-4 hover:border-transparent rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>
  )
}

export default function Search() {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  function closeModal() {
    setOpened(false)
  }

  useEffect(() => {
    closeModal()
  }, [pathname]);

  return (
    <>
      <SearchIcon handleClick={() => setOpened(true)} />
      <Modal
        isOpen={opened}
        onRequestClose={closeModal}
        contentLabel="TailwindCSS Modal Example"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        shouldCloseOnEsc={true}
        className="relative top-32 mx-auto max-w-xl"
      >
        <ModalContent />
      </Modal>
    </>
  )
}
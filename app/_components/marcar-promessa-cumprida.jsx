'use client'

import ReactRecaptcha3 from 'react-google-recaptcha3';
import { useState, useEffect } from 'react';

import { REPO_URL } from '@/consts';

const PLACEHOLDER = `https://sapo.pt/noticia-1
https://sapo.pt/noticia-2
https://publico.pt/noticia-3`

const INPUT_CLASSES = "p-2.5 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"

function formatDataToObject(formData) {
  return Object.fromEntries(formData);
}

function gitEditUrl(docPath) {
  return `${REPO_URL}/edit/main${docPath}`;
}

function Form({ onComplete, docPath }) {
  const [error, setError] = useState();

  // TODO: check if captcha is loaded
  useEffect(() => {
    ReactRecaptcha3.init(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const recaptchaToken = await ReactRecaptcha3.getToken()

      const formData = new FormData(e.target);
      const response = await fetch("/marcar-cumprida", {
        method: 'POST',
        body: JSON.stringify({ ...formatDataToObject(formData), recaptchaToken }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        onComplete()
      } else {
        console.error('Error:', response.statusText)
        setError(true)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(true)
    }
  }

  return (
    <form className="w-full lg:w-1/2 md:w-2/3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onSubmit={handleSubmit}>
      <input type="hidden" name="doc_path" value={docPath} />

      <div className="col-span-full">
        <p>Alternativamente, edita a informação no repositório (<a className="hover:underline text-blue-400" href={gitEditUrl(docPath)}>link</a>)</p>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="fulfilled_date" className="block text-sm font-bold leading-6 text-gray-900">Data de cumprimento</label>
        <div className="mt-2">
          <input required type="date" name="fulfilled_date" id="fulfilled_date" className={INPUT_CLASSES} />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="links" className="block text-sm font-bold leading-6 text-gray-900">Links</label>
        <div className="mt-2">
          <textarea required id="links" name="links" rows="3" placeholder={PLACEHOLDER} className={INPUT_CLASSES}></textarea>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">Necessário: um link por linha</p>
      </div>

      <div className="col-span-full">
        <label htmlFor="comment" className="block text-sm font-bold leading-6 text-gray-900">Comentários</label>
        <div className="mt-2">
          <textarea id="comment" name="comment" rows="3" className={INPUT_CLASSES}></textarea>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">Opcional: informação adicional</p>
      </div>

      <div className="col-span-full">
        <button type="submit" className="border-2 rounded block w-full py-1 px-2 border-black text-black bg-white hover:text-white hover:bg-black">Enviar sugestão</button>
      </div>
      {error && (
        <div className="col-span-full">
          <div className="text-center">
            <p className="text-red-800 text-xs">😵‍💫 Ocorreu um erro, tenta de novo...</p>
          </div>
        </div>
      )}
    </form>
  )
}

export function MarcarPromessaCumprida({ docPath }) {
  const [open, setOpen] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  function handleComplete() {
    setFormComplete(true)
  }

  if (!open) {
    return (
      <a className="hover:underline text-blue-400" onClick={() => setOpen(true)}>
        💭 A promessa foi cumprida? Contribui com informação!
      </a>
    )
  }

  return formComplete ? (
    <p>🎉 Obrigado por contribuires!</p>
  ) : (
    <Form onComplete={handleComplete} docPath={docPath} />
  )
}

export default function Comp(props) {
  return (
    <div className='mt-10'>
      <MarcarPromessaCumprida {...props} />
    </div>
  )
}
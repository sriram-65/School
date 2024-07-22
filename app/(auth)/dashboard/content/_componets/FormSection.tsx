"use client"

import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TempleliteListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS {
  selectedTemplate?: TEMPLATE 
  userFormInput: (formData: any) => void
  loading: boolean
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>({})

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    userFormInput(formData)
  }

  return (
    <div className='p-5 shadow-sm border rounded-md mt-6'>
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt="Icon" width={70} height={70} />
      )}
      <h2 className='font-bold text-2xl mb-2 text-purple-800'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

      <form onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
            <label className='font-bold'>{item.label}</label>
            {item.field === "input" ? (
              <Input name={item.name} required={item?.required} onChange={handleInputs} />
            ) : item.field === "textarea" ? (
              <Textarea name={item.name} required={item?.required} onChange={handleInputs} />
            ) : null}
          </div>
        ))}

        <Button type='submit' disabled={loading}>
          {loading && <Loader2Icon className='animate-spin' />}
          Generate Content
        </Button>
      </form>
    </div>
  )
}

export default FormSection

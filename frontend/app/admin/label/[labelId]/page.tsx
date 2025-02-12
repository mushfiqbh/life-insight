'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { StoreContext } from '@/context/StoreContext';
import FreeSoloCreateOptionDialog from '@/utils/SelectDialogue';
import { Button, Stack } from '@mui/material';

interface FAQ {
  question: string;
  answer: string;
}

interface KeyTerm {
  key: string;
  terms: string;
}

interface OverviewData {
  title: string;
  subtitle: string;
  desc: string;
  author: string | null;
  faqs: FAQ[];
  keyterms: KeyTerm[];
  date: string;
}

const AddOverview = () => {
  const router = useRouter();
  const { url, token, loading, setLoading } = useContext(StoreContext);
  const [buttonText, setButtonText] = useState('Save');
  const [activeIndex, setActiveIndex] = useState(true);
  const [data, setData] = useState<OverviewData>({
    title: '',
    subtitle: '',
    desc: '',
    author: null,
    faqs: [{ question: '', answer: '' }],
    keyterms: [{ key: '', terms: '' }],
    date: new Date().toISOString().split('T')[0],
  });

  const fieldAdder = () => {
    if (activeIndex) {
      setData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { question: '', answer: '' }],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        keyterms: [...prev.keyterms, { key: '', terms: '' }],
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setButtonText('Save');
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    setButtonText('Save');
    const { name, value } = event.target;
    setData((prev) => {
      const updatedFaqs = [...prev.faqs];
      const updatedKeyTerms = [...prev.keyterms];
      
      if (name === 'question') updatedFaqs[index].question = value;
      else if (name === 'answer') updatedFaqs[index].answer = value;
      else if (name === 'key') updatedKeyTerms[index].key = value;
      else if (name === 'terms') updatedKeyTerms[index].terms = value;
      
      return { ...prev, faqs: updatedFaqs, keyterms: updatedKeyTerms };
    });
  };

  const createOverview = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText('Saving');

    const filteredFaqs = data.faqs.filter((faq) => faq.question && faq.answer);
    const filteredKeyterms = data.keyterms.filter((keyterm) => keyterm.key && keyterm.terms);

    const formData = {
      ...data,
      faqs: filteredFaqs.length ? filteredFaqs : [{ question: '', answer: '' }],
      keyterms: filteredKeyterms.length ? filteredKeyterms : [{ key: '', terms: '' }],
    };

    try {
      const response = await axios.post(`${url}/api/catalog/create`, formData, { headers: { token } });
      if (response.data.success) {
        setData({
          title: '',
          subtitle: '',
          desc: '',
          author: null,
          faqs: [{ question: '', answer: '' }],
          keyterms: [{ key: '', terms: '' }],
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        console.error(response.data.message);
      }
      setButtonText('Saved');
    } catch (error) {
      console.error('Error saving overview:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-4/5 mx-auto my-5 p-5 bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={createOverview}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="error" onClick={() => router.push('/admin')}>EXIT</Button>
          <Button variant="contained" type="submit" disabled={buttonText === 'Saved'}>{buttonText}</Button>
        </Stack>

        <div className="flex flex-col gap-5 mt-5">
          <label>Title</label>
          <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="বাংলায় নাম দিন" className="p-2 border rounded-md" />

          <label>Subtitle (Label)</label>
          <input type="text" name="subtitle" value={data.subtitle} onChange={handleChange} placeholder="Label (English Only)" required className="p-2 border rounded-md" />

          <label>Reviewer</label>
          <FreeSoloCreateOptionDialog data={data} setData={setData} setButtonText={setButtonText} />

          <label>Date</label>
          <input type="date" name="date" value={data.date} onChange={handleChange} className="p-2 border rounded-md" />

          <label>Description</label>
          <textarea name="desc" value={data.desc} onChange={handleChange} placeholder="বর্ণনা লিখুন" className="p-2 border rounded-md" />
        </div>

        <div className="mt-5">
          <Stack direction="row" spacing={2}>
            <p className={activeIndex ? 'font-bold' : ''} onClick={() => setActiveIndex(true)}>FAQs</p>
            <p className={!activeIndex ? 'font-bold' : ''} onClick={() => setActiveIndex(false)}>Key Terms</p>
          </Stack>

          {activeIndex && data.faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-2 border p-2 rounded-md">
              <input type="text" name="question" value={faq.question} onChange={(e) => handleFaqsChange(e, index)} placeholder="Question" className="p-2 border rounded-md" />
              <textarea name="answer" value={faq.answer} onChange={(e) => handleFaqsChange(e, index)} placeholder="Answer" className="p-2 border rounded-md" />
            </div>
          ))}
        </div>
        <Button onClick={fieldAdder} variant="outlined" color="info">{activeIndex ? 'Add FAQ' : 'Add Keyterm'}</Button>
      </form>
    </div>
  );
};

export default AddOverview;

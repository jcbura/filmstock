'use client';

import { DragAndDrop, Editor } from '@/components';
import { useState } from 'react';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };

  return file ? (
    <Editor file={file} setFile={setFile} />
  ) : (
    <DragAndDrop onFileSelected={handleFileSelected} />
  );
};

export default Home;

'use client';

import { DragAndDrop, Editor, Footer } from '@/components';
import { useEditor } from '@/contexts';

const Home = () => {
  const { file, setFile } = useEditor();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };

  return (
    <>
      <div className="bg-background flex h-svh max-w-full flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          {file ? (
            <Editor file={file} setFile={setFile} />
          ) : (
            <DragAndDrop onFileSelected={handleFileSelected} />
          )}
        </main>
        <Footer isFileSelected={!!file} />
      </div>
    </>
  );
};

export default Home;

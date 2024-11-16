// Previous imports remain the same...

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  // Previous state declarations remain the same...

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      const url = await uploadImage(selectedFile);
      setMediaUrl(url);
      setFile(selectedFile);
      // Reset any previous error
      setLoginError('');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Failed to upload file');
      // Reset file input and URL on error
      setFile(null);
      setMediaUrl('');
      // Reset the file input element
      e.target.value = '';
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFolder, 
  FaFile, 
  FaDownload, 
  FaHome, 
  FaArrowLeft, 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaFileArchive,
  FaSearch,
  FaChevronRight,
  FaFolderOpen,
  FaVideo
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { downloadFile, getFileSize, getFileType } from '../../utils/fileSystem';
import downloadFiles from '../../utils/downloadFiles';

const getFileIcon = (fileName) => {
  const fileType = getFileType(fileName);
  
  switch (fileType) {
    case 'image':
      return <FaFileImage size={20} className="text-blue-400" />;
    case 'document':
      return <FaFileWord size={20} className="text-blue-600" />;
    case 'spreadsheet':
      return <FaFileExcel size={20} className="text-green-600" />;
    case 'archive':
      return <FaFileArchive size={20} className="text-yellow-600" />;
    case 'video':
      return <FaVideo size={20} className="text-red-400" />;
    default:
      return <FaFile size={20} className="text-gray-400" />;
  }
};

const FilePreview = ({ file }) => {
  const isImage = file.type === 'file' && (
    file.name.toLowerCase().endsWith('.png') ||
    file.name.toLowerCase().endsWith('.jpg') ||
    file.name.toLowerCase().endsWith('.jpeg') ||
    file.name.toLowerCase().endsWith('.gif')
  );

  const isVideo = file.type === 'file' && (
    file.name.toLowerCase().endsWith('.mp4') ||
    file.name.toLowerCase().endsWith('.webm') ||
    file.name.toLowerCase().endsWith('.mov')
  );

  if (isImage) {
    return (
      <div className="w-8 h-8 rounded-lg overflow-hidden">
        <img 
          src={file.path} 
          alt={file.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTIgMi0yLTIgMnptMCA2Yy0yLjIxIDAtNC0xLjc5LTQtNHMxLjc5LTQgNC00IDQgMS43OSA0IDQtMS43OSA0LTQgNHoiLz48L3N2Zz4=';
          }}
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="w-8 h-8 rounded-lg overflow-hidden relative">
        <video 
          src={file.path}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <FaVideo className="text-white text-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
      {getFileIcon(file.name)}
    </div>
  );
};

const FolderItem = ({ folder, onOpen, isOpen }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center space-x-3 p-2 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
      onClick={() => onOpen(folder)}
    >
      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
        {isOpen ? <FaFolderOpen className="text-lg" /> : <FaFolder className="text-lg" />}
      </div>
      <div>
        <p className="font-medium text-white">{folder.name}</p>
        <p className="text-xs text-gray-400">{folder.items?.length || 0} items</p>
      </div>
      <FaChevronRight className="text-gray-400 ml-auto" />
    </motion.div>
  );
};

const FileItem = ({ file, onDownload }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center space-x-3 p-2 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <div className="p-2 rounded-lg">
        <FilePreview file={file} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">{file.name}</p>
        <p className="text-xs text-gray-400">{getFileSize(file.size)}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDownload(file)}
        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
      >
        <FaDownload />
      </motion.button>
    </motion.div>
  );
};

const Downloads = () => {
  const [currentPath, setCurrentPath] = useState(['root']);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const getCurrentFolder = () => {
    if (currentPath.length === 1) {
      return { items: downloadFiles.root };
    }

    let current = downloadFiles.root;
    for (let i = 1; i < currentPath.length; i++) {
      const path = currentPath[i];
      const found = current.find(item => item.name === path);
      if (!found) return null;
      current = found.items;
    }
    return { items: current };
  };

  const handleFolderOpen = (folder) => {
    setCurrentPath([...currentPath, folder.name]);
  };

  const handleFolderBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const handleDownload = async (file) => {
    setDownloadingFile(file);
    try {
      await downloadFile(file.path);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloadingFile(null);
    }
  };

  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        {currentPath.map((path, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">/</span>}
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className={`hover:text-white transition-colors ${
                index === currentPath.length - 1 ? 'text-white font-medium' : ''
              }`}
            >
              {path === 'root' ? 'Downloads' : path}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    const currentFolder = getCurrentFolder();
    if (!currentFolder || !currentFolder.items) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">No items found</p>
        </div>
      );
    }

    let items = [...currentFolder.items];
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const folders = items.filter(item => item.type === 'folder');
    const files = items.filter(item => item.type === 'file');

    return (
      <div className="space-y-4">
        {folders.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Folders</h3>
            {folders.map((folder, index) => (
              <FolderItem
                key={index}
                folder={folder}
                onOpen={handleFolderOpen}
                isOpen={currentPath.includes(folder.name)}
              />
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Files</h3>
            {files.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No items found</p>
            {searchTerm && (
              <p className="text-gray-500 mt-2">Try a different search term</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center space-x-2 md:space-x-4">
              {currentPath.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFolderBack}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FaArrowLeft />
                </motion.button>
              )}
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {currentPath[currentPath.length - 1] === 'root' ? 'Downloads' : currentPath[currentPath.length - 1]}
              </h1>
            </div>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <FaHome />
              </motion.button>
            </Link>
          </div>

          {/* Breadcrumbs */}
          {renderBreadcrumbs()}

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Search files and folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4"
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Download Overlay */}
      <AnimatePresence>
        {downloadingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border border-white/10"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-blue-500/20">
                  {getFileIcon(downloadingFile.name)}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">Downloading</h3>
                <p className="text-blue-400 mb-4">{downloadingFile.name}</p>
                
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Downloads;
import React, { useRef } from 'react';
import { Download, Printer, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import logoImg from '@/assets/logo.png';

interface CertificateProps {
  testTitle: string;
  score: number;
  date: string;
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ testTitle, score, date, onClose }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const userName = user?.name || user?.email || (getLang() === 'en' ? 'Student' : getLang() === 'ru' ? 'Студент' : 'Foydalanuvchi');

  const handlePrint = () => {
    const printContent = certificateRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${userName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              background: #f5f5f5;
              font-family: 'Georgia', serif;
            }
            .certificate {
              width: 1000px;
              height: 700px;
              background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
              border: 3px solid #d4af37;
              position: relative;
              padding: 40px;
            }
            .certificate::before {
              content: '';
              position: absolute;
              inset: 10px;
              border: 2px solid #d4af37;
              pointer-events: none;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 20px;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .logo {
              width: 60px;
              height: 60px;
              object-fit: contain;
            }
            .brand-name {
              font-size: 28px;
              font-weight: bold;
              background: linear-gradient(135deg, #3b82f6, #8b5cf6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .badge-section {
              text-align: right;
            }
            .badge-title {
              font-size: 18px;
              color: #666;
              letter-spacing: 3px;
              text-transform: uppercase;
            }
            .badge-subtitle {
              font-size: 24px;
              font-weight: bold;
              color: #333;
            }
            .seal {
              width: 120px;
              height: 120px;
              background: #e5e7eb;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 10px;
              margin-left: auto;
            }
            .seal-inner {
              width: 100px;
              height: 100px;
              border: 3px solid #9ca3af;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              text-align: center;
            }
            .seal-text {
              font-size: 8px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .seal-brand {
              font-size: 12px;
              font-weight: bold;
              color: #333;
            }
            .content {
              text-align: left;
              margin-top: 30px;
              padding-left: 20px;
            }
            .date {
              color: #666;
              font-size: 14px;
              margin-bottom: 20px;
            }
            .recipient-name {
              font-size: 42px;
              font-weight: bold;
              color: #1a1a1a;
              margin-bottom: 15px;
              font-family: 'Georgia', serif;
            }
            .completion-text {
              color: #666;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .course-title {
              font-size: 24px;
              font-weight: bold;
              color: #1a1a1a;
              margin-bottom: 10px;
            }
            .course-description {
              color: #888;
              font-size: 12px;
              margin-bottom: 40px;
            }
            .signature-section {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: auto;
              padding-top: 40px;
            }
            .signature {
              text-align: left;
            }
            .signature-line {
              font-family: 'Brush Script MT', cursive;
              font-size: 32px;
              color: #333;
              margin-bottom: 5px;
            }
            .signature-name {
              font-size: 12px;
              color: #666;
            }
            .signature-title {
              font-size: 11px;
              color: #888;
            }
            .verify-section {
              text-align: right;
            }
            .verify-label {
              font-size: 10px;
              color: #888;
            }
            .verify-link {
              font-size: 11px;
              color: #3b82f6;
              text-decoration: underline;
            }
            .verify-note {
              font-size: 9px;
              color: #888;
              max-width: 250px;
            }
            .score-badge {
              position: absolute;
              top: 50px;
              right: 200px;
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
            }
            @media print {
              body { background: white; }
              .certificate { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="score-badge">${score}%</div>
            <div class="header">
              <div class="logo-section">
                <img src="${window.location.origin}${logoImg}" class="logo" alt="Logo" />
                <span class="brand-name">CyberSafe</span>
              </div>
              <div class="badge-section">
                <div class="badge-title">COURSE</div>
                <div class="badge-subtitle">CERTIFICATE</div>
                <div class="seal">
                  <div class="seal-inner">
                    <span class="seal-text">Education for Everyone</span>
                    <span class="seal-brand">CyberSafe</span>
                    <span class="seal-text">Course Certificate</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="date">${date}</div>
              <div class="recipient-name">${userName}</div>
              <div class="completion-text">has successfully completed</div>
              <div class="course-title">${testTitle}</div>
              <div class="course-description">an online course authorized by CyberSafe Education Platform</div>
            </div>
            <div class="signature-section">
              <div class="signature">
                <div class="signature-line">CyberSafe Team</div>
                <div class="signature-name">CyberSafe Education</div>
                <div class="signature-title">Director of CyberSafe Certificates</div>
              </div>
              <div class="verify-section">
                <div class="verify-label">Verify at:</div>
                <div class="verify-link">cybersafe.edu/verify/${Date.now()}</div>
                <div class="verify-note">CyberSafe has confirmed the identity of this individual and their participation in the course.</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleDownload = () => {
    handlePrint();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Certificate Preview */}
        <div ref={certificateRef} className="p-8 bg-gradient-to-br from-white to-gray-50 border-4 border-yellow-500/50 m-6 rounded-xl relative overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-3 border-2 border-yellow-500/30 rounded-lg pointer-events-none" />
          
          {/* Score Badge */}
          <div className="absolute top-6 right-48 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold">
            {score}%
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-8 relative">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="w-16 h-16 object-contain" />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                CyberSafe
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 tracking-[3px] uppercase">Course</p>
              <p className="text-xl font-bold text-gray-800">Certificate</p>
              {/* Seal */}
              <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mt-3 ml-auto">
                <div className="w-24 h-24 border-3 border-gray-400 rounded-full flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider">Education for Everyone</span>
                  <Award className="w-6 h-6 text-gray-600 my-1" />
                  <span className="text-xs font-bold text-gray-700">CyberSafe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pl-4 mt-8">
            <p className="text-gray-500 text-sm mb-4">{date}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{userName}</h2>
            <p className="text-gray-500 text-sm mb-2">
              {getLang() === 'en' ? 'has successfully completed' : getLang() === 'ru' ? 'успешно завершил(а)' : 'muvaffaqiyatli yakunladi'}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{testTitle}</h3>
            <p className="text-gray-400 text-xs mb-12">
              {getLang() === 'en' 
                ? 'an online course authorized by CyberSafe Education Platform'
                : getLang() === 'ru'
                ? 'онлайн-курс, авторизованный платформой CyberSafe Education'
                : "CyberSafe Education Platform tomonidan avtorizatsiya qilingan onlayn kurs"
              }
            </p>
          </div>

          {/* Signature */}
          <div className="flex justify-between items-end mt-16 pl-4">
            <div>
              <p className="font-serif text-2xl italic text-gray-700 mb-1">CyberSafe Team</p>
              <p className="text-xs text-gray-500">CyberSafe Education</p>
              <p className="text-xs text-gray-400">Director of CyberSafe Certificates</p>
            </div>
            <div className="text-right text-xs text-gray-400">
              <p>Verify at:</p>
              <p className="text-blue-500 underline">cybersafe.edu/verify/{Date.now()}</p>
              <p className="max-w-[200px] mt-1">
                CyberSafe has confirmed the identity of this individual and their participation in the course.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex justify-center gap-4">
          <Button onClick={handleDownload} className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500">
            <Download className="w-4 h-4" />
            {getLang() === 'en' ? 'Download' : getLang() === 'ru' ? 'Скачать' : 'Yuklab olish'}
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            {getLang() === 'en' ? 'Print' : getLang() === 'ru' ? 'Печать' : 'Chop etish'}
          </Button>
          <Button onClick={onClose} variant="ghost">
            {getLang() === 'en' ? 'Close' : getLang() === 'ru' ? 'Закрыть' : 'Yopish'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

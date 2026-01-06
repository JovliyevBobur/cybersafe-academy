import React from 'react';
import { Download, Printer } from 'lucide-react';
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

  const getLang = () => {
    if (t('home') === 'Home') return 'en';
    if (t('home') === 'Главная') return 'ru';
    return 'uz';
  };

  const userName = user?.name || user?.email || (getLang() === 'en' ? 'Student' : getLang() === 'ru' ? 'Студент' : 'Foydalanuvchi');
  const certificateId = `CSE-${Date.now().toString(36).toUpperCase()}`;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${userName}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              background: #0a0a0a;
              font-family: 'Inter', sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .certificate {
              width: 297mm;
              height: 210mm;
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
              position: relative;
              padding: 40px 60px;
              overflow: hidden;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
              pointer-events: none;
            }
            .border-frame {
              position: absolute;
              inset: 20px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 8px;
              pointer-events: none;
            }
            .border-frame::before {
              content: '';
              position: absolute;
              inset: 8px;
              border: 1px solid rgba(59, 130, 246, 0.3);
              border-radius: 4px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              position: relative;
              z-index: 1;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            .logo {
              width: 56px;
              height: 56px;
              object-fit: contain;
              filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
            }
            .brand {
              display: flex;
              flex-direction: column;
            }
            .brand-name {
              font-size: 28px;
              font-weight: 700;
              background: linear-gradient(135deg, #60a5fa, #a78bfa);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              letter-spacing: -0.5px;
            }
            .brand-tagline {
              font-size: 11px;
              color: rgba(255, 255, 255, 0.5);
              letter-spacing: 3px;
              text-transform: uppercase;
            }
            .certificate-type {
              text-align: right;
            }
            .certificate-label {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.4);
              letter-spacing: 4px;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .certificate-title {
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              font-family: 'Playfair Display', serif;
            }
            .main-content {
              position: relative;
              z-index: 1;
              margin-top: 50px;
              text-align: center;
            }
            .completion-text {
              font-size: 13px;
              color: rgba(255, 255, 255, 0.5);
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 16px;
            }
            .recipient-name {
              font-size: 52px;
              font-weight: 700;
              color: #ffffff;
              font-family: 'Playfair Display', serif;
              margin-bottom: 20px;
              text-shadow: 0 4px 30px rgba(59, 130, 246, 0.3);
            }
            .has-completed {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.6);
              margin-bottom: 12px;
            }
            .course-title {
              font-size: 26px;
              font-weight: 600;
              color: #60a5fa;
              margin-bottom: 8px;
            }
            .course-provider {
              font-size: 13px;
              color: rgba(255, 255, 255, 0.4);
              margin-bottom: 8px;
            }
            .score-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
              border: 1px solid rgba(16, 185, 129, 0.4);
              padding: 8px 20px;
              border-radius: 30px;
              margin-top: 16px;
            }
            .score-label {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.6);
            }
            .score-value {
              font-size: 18px;
              font-weight: 700;
              color: #10b981;
            }
            .footer {
              position: absolute;
              bottom: 50px;
              left: 60px;
              right: 60px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              z-index: 1;
            }
            .signature-section {
              display: flex;
              gap: 60px;
            }
            .signature {
              text-align: left;
            }
            .signature-line {
              font-family: 'Playfair Display', serif;
              font-size: 26px;
              font-style: italic;
              color: rgba(255, 255, 255, 0.9);
              margin-bottom: 8px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              padding-bottom: 8px;
            }
            .signature-name {
              font-size: 11px;
              color: rgba(255, 255, 255, 0.6);
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .signature-title {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.4);
            }
            .date-section {
              text-align: left;
            }
            .date-label {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.4);
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            .date-value {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.8);
              font-weight: 500;
            }
            .verify-section {
              text-align: right;
            }
            .verify-label {
              font-size: 9px;
              color: rgba(255, 255, 255, 0.4);
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            .certificate-id {
              font-size: 12px;
              color: rgba(96, 165, 250, 0.8);
              font-family: monospace;
              letter-spacing: 1px;
            }
            .verify-url {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.4);
              margin-top: 4px;
            }
            .decorative-circles {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              pointer-events: none;
              overflow: hidden;
            }
            .circle {
              position: absolute;
              border-radius: 50%;
              border: 1px solid rgba(59, 130, 246, 0.1);
            }
            .circle-1 {
              width: 400px;
              height: 400px;
              bottom: -200px;
              left: -100px;
            }
            .circle-2 {
              width: 300px;
              height: 300px;
              top: -100px;
              right: -50px;
            }
            .circle-3 {
              width: 200px;
              height: 200px;
              top: 50%;
              right: 10%;
              border-color: rgba(139, 92, 246, 0.1);
            }
            @media print {
              body { background: #0f172a; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="decorative-circles">
              <div class="circle circle-1"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-3"></div>
            </div>
            <div class="border-frame"></div>
            
            <div class="header">
              <div class="logo-section">
                <img src="${window.location.origin}${logoImg}" class="logo" alt="Logo" />
                <div class="brand">
                  <span class="brand-name">CyberSafe</span>
                  <span class="brand-tagline">Education Platform</span>
                </div>
              </div>
              <div class="certificate-type">
                <div class="certificate-label">Certificate of</div>
                <div class="certificate-title">Completion</div>
              </div>
            </div>

            <div class="main-content">
              <div class="completion-text">This is to certify that</div>
              <div class="recipient-name">${userName}</div>
              <div class="has-completed">has successfully completed the course</div>
              <div class="course-title">${testTitle}</div>
              <div class="course-provider">An authorized course by CyberSafe Education Platform</div>
              <div class="score-badge">
                <span class="score-label">Final Score:</span>
                <span class="score-value">${score}%</span>
              </div>
            </div>

            <div class="footer">
              <div class="signature-section">
                <div class="signature">
                  <div class="signature-line">CyberSafe Team</div>
                  <div class="signature-name">CyberSafe Education</div>
                  <div class="signature-title">Director of Certificates</div>
                </div>
                <div class="date-section">
                  <div class="date-label">Date of Issue</div>
                  <div class="date-value">${date}</div>
                </div>
              </div>
              <div class="verify-section">
                <div class="verify-label">Certificate ID</div>
                <div class="certificate-id">${certificateId}</div>
                <div class="verify-url">cybersafe.edu/verify</div>
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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Certificate Preview - Dark Coursera Style */}
        <div className="relative m-4 rounded-xl overflow-hidden" style={{ aspectRatio: '297/210' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/2 left-1/5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute top-1/4 right-1/5 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
            
            {/* Border frame */}
            <div className="absolute inset-4 border border-white/10 rounded-lg">
              <div className="absolute inset-2 border border-blue-500/20 rounded" />
            </div>

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img src={logoImg} alt="Logo" className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      CyberSafe
                    </h1>
                    <p className="text-[10px] text-white/40 tracking-[3px] uppercase">Education Platform</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 tracking-[3px] uppercase mb-1">Certificate of</p>
                  <p className="text-xl font-semibold text-white font-serif">Completion</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center -mt-4">
                <p className="text-xs text-white/50 tracking-[2px] uppercase mb-3">
                  {getLang() === 'en' ? 'This is to certify that' : getLang() === 'ru' ? 'Настоящим удостоверяется, что' : 'Ushbu sertifikat tasdiqlaydi'}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4 drop-shadow-[0_4px_30px_rgba(59,130,246,0.3)]">
                  {userName}
                </h2>
                <p className="text-sm text-white/60 mb-2">
                  {getLang() === 'en' ? 'has successfully completed the course' : getLang() === 'ru' ? 'успешно завершил(а) курс' : 'kursni muvaffaqiyatli yakunladi'}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-2">{testTitle}</h3>
                <p className="text-xs text-white/40">
                  {getLang() === 'en' 
                    ? 'An authorized course by CyberSafe Education Platform'
                    : getLang() === 'ru'
                    ? 'Авторизованный курс от платформы CyberSafe Education'
                    : "CyberSafe Education Platform tomonidan avtorizatsiya qilingan kurs"
                  }
                </p>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-5 py-2 rounded-full mt-4">
                  <span className="text-xs text-white/60">
                    {getLang() === 'en' ? 'Final Score:' : getLang() === 'ru' ? 'Итоговый балл:' : 'Yakuniy ball:'}
                  </span>
                  <span className="text-lg font-bold text-emerald-400">{score}%</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="flex gap-12">
                  <div>
                    <p className="text-xl font-serif italic text-white/80 border-b border-white/20 pb-2 mb-2">
                      CyberSafe Team
                    </p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">CyberSafe Education</p>
                    <p className="text-[9px] text-white/40">Director of Certificates</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">
                      {getLang() === 'en' ? 'Date of Issue' : getLang() === 'ru' ? 'Дата выдачи' : 'Berilgan sana'}
                    </p>
                    <p className="text-sm text-white/80 font-medium">{date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Certificate ID</p>
                  <p className="text-xs text-blue-400/80 font-mono tracking-wider">{certificateId}</p>
                  <p className="text-[9px] text-white/40 mt-1">cybersafe.edu/verify</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex justify-center gap-4">
          <Button onClick={handleDownload} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Download className="w-4 h-4" />
            {getLang() === 'en' ? 'Download PDF' : getLang() === 'ru' ? 'Скачать PDF' : 'PDF yuklab olish'}
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

import React, { useState } from "react";
import { 
  Dices, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ClipboardCheck, 
  Check, 
  X, 
  Lock
} from "lucide-react";
import { spanishQuestions, Question, Option } from "./data";

export default function App() {
  // Ticket selection state
  // null means no ticket is chosen yet.
  const [ticketNum, setTicketNum] = useState<number | "random" | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  
  // Custom states to track opened translations
  // Format: {[questionId]: boolean}
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  
  // Format: {[questionId_optionKey]: boolean}
  const [revealedOptions, setRevealedOptions] = useState<Record<string, boolean>>({});

  // Multiple choice selection per question ID
  // Format: {[questionId]: "a" | "b" | "c"}
  const [selectedOptions, setSelectedOptions] = useState<Record<number, "a" | "b" | "c">>({});

  // Custom handwritten answers per question ID
  // Format: {[questionId]: string}
  const [customAnswers, setCustomAnswers] = useState<Record<number, string>>({});

  // AI evaluations per question ID
  interface AIFeedback {
    score: number;
    feedbackArmenian: string;
    correctedSpanish: string;
    alternatives: { spanish: string; armenian: string }[];
    error?: string;
  }
  const [evaluations, setEvaluations] = useState<Record<number, AIFeedback>>({});
  const [loadingEvaluations, setLoadingEvaluations] = useState<Record<number, boolean>>({});

  // Global show/hide translations toggle for the active ticket
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Drawing standard predetermined tickets or a completely random ticket
  const drawTicket = (type: number | "random") => {
    setRevealedQuestions({});
    setRevealedOptions({});
    setSelectedOptions({});
    setCustomAnswers({});
    setEvaluations({});
    setLoadingEvaluations({});
    setShowAllTranslations(false);
    setTicketNum(type);

    if (type === "random") {
      // Shuffle deep copy of questions and take 5
      const shuffled = [...spanishQuestions].sort(() => 0.5 - Math.random());
      setActiveQuestions(shuffled.slice(0, 5));
    } else {
      // Tickets are divided sequentially
      // Ticket 1: Q1-Q5, Ticket 2: Q6-Q10, Ticket 3: Q11-Q15, Ticket 4: Q16-Q20
      const startIdx = (type - 1) * 5;
      const endIdx = startIdx + 5;
      setActiveQuestions(spanishQuestions.slice(startIdx, endIdx));
    }
  };

  // Click on Question to toggle Armenian Translation
  const toggleQuestionTranslation = (qId: number) => {
    setRevealedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Click on Option to toggle Armenian Translation
  const toggleOptionTranslation = (qId: number, optionKey: "a" | "b" | "c") => {
    const key = `${qId}_${optionKey}`;
    setRevealedOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Select option key
  const handleSelectOption = (qId: number, optionKey: "a" | "b" | "c") => {
    setSelectedOptions(prev => ({ ...prev, [qId]: optionKey }));
  };

  // Handle manual answer changes
  const handleCustomAnswerChange = (qId: number, text: string) => {
    setCustomAnswers(prev => ({ ...prev, [qId]: text }));
  };

  // Call API backend to verify the custom answer using Gemini 3.5
  const evaluateCustomAnswer = async (qId: number, questionText: string, questionArmenian: string) => {
    const answer = customAnswers[qId];
    if (!answer || !answer.trim()) return;

    setLoadingEvaluations(prev => ({ ...prev, [qId]: true }));
    try {
      const response = await fetch("/api/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionText,
          questionArmenian: questionArmenian,
          userAnswer: answer,
        }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        // Not JSON
      }

      if (!response.ok) {
        if (data && data.feedbackArmenian) {
          setEvaluations(prev => ({ ...prev, [qId]: data }));
          return;
        }
        throw new Error(data?.error || `Սերվերի սխալ (Կոդ ${response.status})`);
      }

      if (data) {
        setEvaluations(prev => ({ ...prev, [qId]: data }));
      }
    } catch (err: any) {
      console.error(err);
      setEvaluations(prev => ({ 
        ...prev, 
        [qId]: { 
          score: 0, 
          feedbackArmenian: `Ստուգման ժամանակ տեղի ունեցավ սխալ: ${err.message || ""} Խնդրում ենք համոզվել, որ միացված է Ձեր ինտերնետ կապը և ճիշտ է կոնֆիգուրացված GEMINI_API_KEY-ը:`,
          correctedSpanish: answer,
          alternatives: [],
          error: err.message
        } 
      }));
    } finally {
      setLoadingEvaluations(prev => ({ ...prev, [qId]: false }));
    }
  };

  // Helper to determine the color of the score
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "text-amber-300 bg-amber-500/10 border-amber-500/20";
    return "text-rose-300 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div className="min-h-screen font-sans antialiased text-white pb-16 relative overflow-hidden bg-[#0f172a]">
      
      {/* Background Decor Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[100vw] max-w-[500px] h-[350px] sm:h-[500px] bg-blue-500/20 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[100vw] max-w-[500px] h-[350px] sm:h-[500px] bg-purple-500/20 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"></div>

      {/* Top Banner Branding */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/50">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight font-display text-white">
                  Español <span className="text-blue-400 font-medium">‹›</span> Armenian
                </span>
                <span className="flex items-center gap-0.5 text-xs bg-white/10 px-2 py-0.5 rounded-full text-blue-300 font-mono border border-white/5">
                  🇪🇸 🇦🇲
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Ինտերակտիվ իսպաներենի քննական տոմսեր և պատասխանների ավտոմատ ստուգում
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {ticketNum !== null && (
              <button
                id="btn-return-lobby"
                onClick={() => setTicketNum(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-blue-400" />
                <span>Վերադառնալ նախասրահ</span>
              </button>
            )}
            <span className="text-xs font-mono py-1 px-2.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md">
              20 / 20 Բառապաշար
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 relative z-10">
        {ticketNum === null ? (
          /* SECTION A: LOBBY / TICKET SELECTOR */
          <div className="py-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-bold bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                Ինքնաստուգման Համակարգ
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-4 tracking-tight">
                Քաշեք Ձեր Քննական Տոմսը
              </h1>
              <p className="text-slate-300 mt-2 text-md max-w-xl mx-auto">
                Յուրաքանչյուր տոմս պարունակում է 5 պատահական կամ հերթական հարցեր։ Կարող եք կարդալ իսպաներեն տարբերակները, սեղմելով տեսնել հայերեն թարգմանությունները և ստուգել Ձեր գրավոր պատասխանները։
              </p>
            </div>

            {/* Simulated physically laid out exam ticket cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[1, 2, 3, 4].map((num) => {
                const startNum = (num - 1) * 5 + 1;
                const endNum = num * 5;
                return (
                  <div 
                    key={num}
                    id={`ticket-card-${num}`}
                    onClick={() => drawTicket(num)}
                    className="group relative backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 rounded-2xl p-6 shadow-xl cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Retro Guilloche stamp effect on ticket card */}
                    <div className="absolute right-0 top-0 opacity-5 group-hover:opacity-10 transition-opacity -mr-8 -mt-8">
                      <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center font-bold text-2xl font-mono">
                        APPROVED
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-white/40 font-semibold uppercase tracking-wider">
                          BOLETO DE EXAMEN
                        </span>
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-md border border-blue-500/30">
                          Հարցեր {startNum}-{endNum}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-400 transition-colors">
                        Քննական Տոմս № {num}
                      </h3>
                      
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                        Մշակեք իսպաներեն կառուցվածքները և թիրախային երկխոսությունները, ներառյալ հարցերի {num}-ին փաթեթը։
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-blue-300 font-medium">
                      <span>Անցնել տոմսին</span>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}

              {/* Special Dynamic Random Ticket */}
              <div 
                id="ticket-card-random"
                onClick={() => drawTicket("random")}
                className="group relative bg-gradient-to-br from-blue-600/30 to-indigo-600/30 text-white rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/20 hover:border-blue-400/60 cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden md:col-span-2 border border-white/10 backdrop-blur-xl"
              >
                <div className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform">
                  <Dices className="w-40 h-40" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-white/80 uppercase tracking-wider font-semibold">
                      BOLETO ALEATORIO
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-md backdrop-blur-xs">
                      Միքս
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display flex items-center gap-2">
                    <Dices className="w-6 h-6 animate-pulse" />
                    Պատահական Քննական Տոմս
                  </h3>
                  
                  <p className="text-sm text-white/90 mt-2 max-w-xl">
                    Քաշեք 5 պատահականորեն ընտրված հարց ամբողջ 20 հարցերի շտեմարանից։ Սա իրական քննության նախապատրաստման լավագույն միջոցն է։
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-sm font-semibold">
                  <span>Գեներացնել պատահական տոմս</span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Tutorial banner */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h4 className="text-base font-bold font-display text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Ինչպե՞ս է սա աշխատում․
              </h4>
              <ul className="space-y-2 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span><strong>Սեղմեք նախադասության վրա</strong>՝ դրա հայերեն թարգմանությունը բացելու համար (թե՛ հարցի, թե՛ տարբերակների համար)։</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span><strong>Ընտրեք պատասխան</strong> կամ ավելի լավ՝ <strong>գրեք Ձեր սեփական պատասխանը</strong> իսպաներենով։</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span><strong>Ստուգեք Պատասխանը</strong>՝ ստանալու համար քերականական մանրակրկիտ գնահատական և բացատրություն հայերենով։</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* SECTION B: ACTIVE EXAM TICKET VIEW */
          <div className="py-2">
            
            {/* Elegant Vintage Academic Layout with Frosted Glass styling */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
              
              {/* Retro decorative borders reminiscent of traditional exams */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-teal-300 to-purple-500" />
              
              {/* Header inside the simulated paper */}
              <div className="text-center border-b border-white/15 pb-6 mb-8">
                <div className="text-white/40 font-serif tracking-widest text-xs font-semibold">
                  UNIVERSIDAD DE IDIOMAS DE EREVÁN • ԵՐԵՎԱՆԻ ԼԵԶՈՒՆԵՐԻ ՀԱՄԱԼՍԱՐԱՆ
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-2 tracking-wide uppercase">
                  {ticketNum === "random" ? "EXAMEN INDIVIDUAL" : `CUESTIONARIO DE EXAMEN • ՏՈՄՍ № ${ticketNum}`}
                </h2>
                
                <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-slate-300">
                  <span className="font-mono bg-white/5 rounded px-2.5 py-1 border border-white/10 text-white/90">
                    ՊԱՐՈՒՆԱԿՈՒԹՅՈՒՆ: 5 ՔՐԵԱԿԱՆ ՀԱՐՑ
                  </span>
                  <span>•</span>
                  <span>Բարդություն: Միջին (A2-B1)</span>
                </div>

                {/* Switchable controls inside the header */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <button
                    onClick={() => setShowAllTranslations(!showAllTranslations)}
                    className="inline-flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 font-medium px-4 py-1.5 rounded-full text-xs transition-colors border border-blue-500/20 cursor-pointer"
                  >
                    {showAllTranslations ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Թաքցնել հայերեն թարգմանությունները</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Բացել բոլոր թարգմանությունները</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => drawTicket(ticketNum)}
                    className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/90 font-medium px-4 py-1.5 rounded-full text-xs transition-colors border border-white/10 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Մաքրել արդյունքները</span>
                  </button>
                </div>
              </div>

              {/* LIST OF QUESTIONS IN THE TICKET */}
              <div className="space-y-12">
                {activeQuestions.map((q, idx) => {
                  const isQRevealed = showAllTranslations || revealedQuestions[q.id];
                  
                  return (
                    <div 
                      key={q.id}
                      id={`question-block-${q.id}`}
                      className="group border-b border-white/10 pb-10 last:border-b-0 last:pb-0"
                    >
                      {/* Question Text Card */}
                      <div className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/10 transition-all">
                        <div className="flex items-start gap-3">
                          <span className="flex-none w-7 h-7 rounded-lg bg-blue-600 text-white font-mono flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/30 mt-1">
                            {idx + 1}
                          </span>
                          
                          <div className="space-y-3 flex-1">
                            {/* Question sentence in Spanish  */}
                            <div 
                              onClick={() => toggleQuestionTranslation(q.id)}
                              className="cursor-pointer group/q"
                              title="Սեղմեք թարգմանությունը տեսնելու համար"
                            >
                              <p className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex flex-wrap items-center gap-2 leading-snug">
                                <span className="underline decoration-dashed decoration-blue-400 underline-offset-4 group-hover/q:text-blue-300 transition-colors">
                                  {q.question}
                                </span>
                                <span className="inline-flex items-center text-white/40 group-hover/q:text-blue-400 transition-colors">
                                  {isQRevealed ? <EyeOff className="w-4.5 h-4.5 ml-1" /> : <Eye className="w-4.5 h-4.5 ml-1" />}
                                </span>
                              </p>
                              <span className="text-[10px] font-mono text-white/30 block mt-1 tracking-wider uppercase">
                                Սեղմեք՝ թարգմանելու համար
                              </span>
                            </div>

                            {/* Question translation in Armenian */}
                            {(isQRevealed) && (
                              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-2.5 rounded-r-xl transition-all">
                                <p className="text-sm font-semibold text-blue-200 leading-relaxed font-sans">
                                  {q.questionArmenian}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* OPTIONS SECTION */}
                      <div className="mt-5 ml-4 sm:ml-10 space-y-3">
                        <p className="text-xs font-mono font-semibold tracking-wider text-white/40 uppercase">
                          RESPUESTAS CONVERSACIONALES / ԽՈՍԱԿՑԱԿԱՆ ՏԱՐԲԵՐԱԿՆԵՐ (Սեղմեք թարգմանելու համար)
                        </p>
                        
                        <div className="grid sm:grid-cols-3 gap-3">
                          {q.options.map((opt) => {
                            const isOptRevealed = showAllTranslations || revealedOptions[`${q.id}_${opt.key}`];
                            const isSelected = selectedOptions[q.id] === opt.key;

                            return (
                              <div
                                key={opt.key}
                                onClick={() => handleSelectOption(q.id, opt.key)}
                                className={`relative border rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between text-left ${
                                  isSelected 
                                    ? "bg-blue-500/20 border-blue-400 ring-2 ring-blue-500/20 text-white" 
                                    : "bg-white/5 hover:bg-white/10 border-white/10"
                                }`}
                              >
                                <div>
                                  {/* Letter and answer option in Spanish */}
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-5 h-5 font-mono font-bold text-xs rounded-full flex items-center justify-center ${
                                      isSelected ? "bg-blue-500 text-white" : "bg-white/10 text-white/80"
                                    }`}>
                                      {opt.key.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-bold text-white font-display">
                                      {opt.text}
                                    </span>
                                  </div>

                                  {/* Armenian translation */}
                                  {isOptRevealed ? (
                                    <p className="text-xs text-blue-200 italic bg-blue-500/10 p-2 rounded mt-1 border border-blue-500/10 font-sans">
                                      {opt.translation}
                                    </p>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOptionTranslation(q.id, opt.key);
                                      }}
                                      className="inline-flex items-center gap-1.5 mt-1 text-white/50 hover:text-blue-300 text-[10px] font-mono font-semibold transition-colors"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Իմացիր թարգմանությունը</span>
                                    </button>
                                  )}
                                </div>

                                {isSelected && (
                                  <span className="absolute right-2 top-2 text-blue-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* WRITTEN ATTEMPT / HANDWRITTEN EXERCISE */}
                      <div className="mt-6 ml-4 sm:ml-10 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <label className="text-xs font-mono font-bold tracking-wider text-blue-300 uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            ԳՐԵԼ ԻՆՔՆՈՒՐՈՒՅՆ ՊԱՏԱՍԽԱՆ
                          </label>
                          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded text-blue-300 font-mono">
                            Ճիշտ կառուցվածք
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                          Գրեք Ձեր սեփական պատասխանը իսպաներենով։ Համակարգը մանրամասն կվերլուծի այն, կգնահատի, կփոխարինի սխալները և կառաջարկի ճիշտ տարբերակներ:
                        </p>

                        <div className="space-y-3">
                          <textarea
                            value={customAnswers[q.id] || ""}
                            onChange={(e) => handleCustomAnswerChange(q.id, e.target.value)}
                            placeholder="Escribe tu respuesta aquí en español..."
                            rows={2}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 placeholder:text-white/30 text-white font-mono"
                          />

                          <div className="flex items-center justify-end">
                            <button
                              type="button"
                              disabled={loadingEvaluations[q.id] || !(customAnswers[q.id]?.trim())}
                              onClick={() => evaluateCustomAnswer(q.id, q.question, q.questionArmenian)}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 text-white font-medium text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                            >
                              {loadingEvaluations[q.id] ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  <span>Ստուգվում է...</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                                  <span>Ուղարկել Պատասխանը</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* SUBMISSION RESPONSE CONTAINER */}
                        {evaluations[q.id] && (
                          <div className="mt-4 bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-4 shadow-md space-y-3.5 animate-fadeIn">
                            
                            {/* Score and Core Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white/50 tracking-wider font-mono">
                                  ԱՐԴՅՈՒՆՔ:
                                </span>
                                <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${getScoreColor(evaluations[q.id].score)}`}>
                                  {evaluations[q.id].score}/100 միավոր
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-mono">
                                <ClipboardCheck className="w-3.5 h-3.5 text-blue-400" />
                                <span>Ստուգված է</span>
                              </div>
                            </div>

                            {/* Corrected Spanish version */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-white/40 uppercase">
                                CORRECTO EN ESPAÑOL / ՈՒՂՂՎԱԾ ՏԱՐԲԵՐԱԿԸ
                              </span>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                                <p className="text-sm font-mono font-bold text-emerald-300 tracking-tight">
                                  {evaluations[q.id].correctedSpanish}
                                </p>
                              </div>
                            </div>

                            {/* Detailed Explanation / Commentary in Armenian */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-white/40 uppercase">
                                COMENTARIO Y ERRORES / ՄԱՆՐԱՄԱՍՆ ԲԱՑԱՏՐՈՒԹՅՈՒՆ
                              </span>
                              <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                                  {evaluations[q.id].feedbackArmenian}
                                </p>
                              </div>
                            </div>

                            {/* Standard Natural Alternatives */}
                            {evaluations[q.id].alternatives && evaluations[q.id].alternatives.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono font-bold text-white/40 uppercase">
                                  ALTERNATIVAS RECOMENDADAS / ԱՅԼԸՆՏՐԱՆՔԱՅԻՆ ՊԱՏԱՍԽԱՆՆԵՐ
                                </span>
                                
                                <div className="space-y-2">
                                  {evaluations[q.id].alternatives.map((alt, altIdx) => (
                                    <div key={altIdx} className="bg-white/5 p-2.5 rounded-lg border border-white/10 flex flex-col gap-1 text-xs">
                                      <span className="font-mono font-bold text-white">
                                        • {alt.spanish}
                                      </span>
                                      <span className="text-slate-300 italic pl-3">
                                        ({alt.armenian})
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

              {/* FOOTER ACTIONS FOR ACTIVE TICKET */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-blue-400">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">
                      Ավարտեցի՞ք քննությունը
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Դուք կարող եք ցանկացած պահի վերադառնալ նախասրահ և նոր տոմս քաշել:
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setTicketNum(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Խաղարկել նոր տոմս</span>
                    <Dices className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Embedded footer */}
      <footer className="mt-16 border-t border-white/5 py-8 bg-black/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 tracking-wide font-mono uppercase">
            © 2026 EREVÁN IDIOMAS • ESPAÑOL RAPIDAMENTE
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Կառուցված է հատուկ իսպաներենի սիրահարների և լեզու սովորողների համար:
          </p>
        </div>
      </footer>

    </div>
  );
}

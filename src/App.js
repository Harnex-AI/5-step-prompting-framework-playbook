import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('default');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      prompt: "Summarise the meeting",
      result: "Generic bullet points that miss the point and don't help anyone take action."
    },
    {
      prompt: '<span class="step-1-text">Summarise the key decisions from the marketing strategy meeting</span>',
      result: "More focused summary, but still lacks specific context and actionable detail."
    },
    {
      prompt: '<span class="step-1-text">Summarise the key decisions from the marketing strategy meeting</span> <span class="step-2-text">Act as an experienced project manager.</span>',
      result: "Better structure and professional perspective, but missing crucial context."
    },
    {
      prompt: '<span class="step-1-text">Summarise the key decisions from the marketing strategy meeting</span> <span class="step-2-text">Act as an experienced project manager.</span> <span class="step-3-text">where we discussed Q4 campaign budget and target audiences</span>',
      result: "Much more relevant and specific to your actual situation and needs."
    },
    {
      prompt: '<span class="step-1-text">Summarise the key decisions from the marketing strategy meeting</span> <span class="step-2-text">Act as an experienced project manager.</span> <span class="step-3-text">where we discussed Q4 campaign budget and target audiences</span> <span class="step-4-text">Focus on actionable outcomes and who\'s responsible</span>',
      result: "Actionable summary with clear ownership and next steps identified."
    },
    {
      prompt: '<span class="step-1-text">Summarise the key decisions from the marketing strategy meeting</span> <span class="step-2-text">Act as an experienced project manager.</span> <span class="step-3-text">where we discussed Q4 campaign budget and target audiences</span> <span class="step-4-text">Focus on actionable outcomes and who\'s responsible</span> <span class="step-5-text">Format as bullet points with deadlines and next steps clearly highlighted</span>',
      result: "Perfect summary ready to share with the team - clear, actionable, and professionally formatted!"
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  };

  const CopyButton = ({ text, className = "copy-btn-light" }) => {
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCopy = async () => {
      if (loading) return;
      
      setLoading(true);
      const success = await copyToClipboard(text);
      setLoading(false);
      
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCopy();
      }
    };

    return (
      <button 
        className={`${className} ${copied ? 'copied' : ''} ${loading ? 'loading' : ''}`}
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        disabled={loading}
        aria-label={copied ? 'Text copied to clipboard' : loading ? 'Copying text...' : 'Copy text to clipboard'}
        tabIndex={0}
      >
        {loading ? '⏳ Copying...' : copied ? '✅ Copied!' : '📋 Copy'}
      </button>
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
  };

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="container" role="application" aria-label="PromptCrafter - 5-Step Prompting Framework">
      <nav className="sidebar" role="navigation" aria-label="Main navigation">
        <header className="logo">
          <h1>PromptCrafter</h1>
          <p>5 steps for better results</p>
        </header>
        
        <div 
          className={`nav-item ${activeSection === 'default' ? 'active' : ''}`}
          onClick={() => setActiveSection('default')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('default');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to 5-Step Pattern section"
        >
          <div className="nav-title">The 5-Step Pattern</div>
          <div className="nav-desc">Core framework explained</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={() => setActiveSection('intro')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('intro');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to Watch It Build section"
        >
          <div className="nav-title">Watch It Build</div>
          <div className="nav-desc">See the transformation</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveSection('examples')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('examples');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to Quick Start Examples section"
        >
          <div className="nav-title">Quick Start Examples</div>
          <div className="nav-desc">3 detailed walkthroughs</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveSection('templates')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('templates');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to Copy-Paste Templates section"
        >
          <div className="nav-title">Copy-Paste Templates</div>
          <div className="nav-desc">Ready-to-use formats</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveSection('scenarios')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('scenarios');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to Workplace Scenarios section"
        >
          <div className="nav-title">Workplace Scenarios</div>
          <div className="nav-desc">Color-coded examples</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveSection('practice')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveSection('practice');
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Navigate to Try Right Now section"
        >
          <div className="nav-title">Try Right Now</div>
          <div className="nav-desc">Hands-on exercises</div>
        </div>
      </nav>

      <main className="main-content" role="main" aria-label="Content area">
        {activeSection === 'default' && (
          <section className="section active" aria-labelledby="hero-title">
            <div className="hero-section">
              <h1 id="hero-title" className="hero-title">Get better AI chat results.</h1>
              <p className="hero-subtitle">The 5-Step Pattern for Everything</p>
            </div>

            <div className="before-after-container">
              <div className="comparison-box">
                <div className="comparison-side before-side">
                  <div className="comparison-label bad-label">Go from:</div>
                  <div className="comparison-content bad-content">
                    "Summarise the meeting"
                  </div>
                </div>
                <div className="arrow">→</div>
                <div className="comparison-side after-side">
                  <div className="comparison-label good-label">To:</div>
                  <div className="comparison-content good-content">
                    <span className="step-1-text">Summarise the key decisions from the marketing strategy meeting.</span> <span className="step-2-text">Act as an experienced project manager</span> <span className="step-3-text">where we discussed Q4 campaign budget and target audiences.</span> <span className="step-4-text">Focus on actionable outcomes and who's responsible.</span> <span className="step-5-text">Format as bullet points with deadlines and next steps clearly highlighted.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="framework-grid">
              <div className="framework-card step-1">
                <div className="card-number">1</div>
                <div className="card-title" style={{color: '#2563eb'}}>Goal</div>
                <div className="card-subtitle">What exactly do you want?</div>
                <div className="card-content">
                  Make it specific instead of vague. "Explain AI" becomes "Explain machine learning to marketing managers."
                </div>
              </div>

              <div className="framework-card step-2">
                <div className="card-number">2</div>
                <div className="card-title" style={{color: '#16a34a'}}>Role</div>
                <div className="card-subtitle">Who should help you?</div>
                <div className="card-content">
                  Get expert-level thinking. "Act as an experienced trainer" gives you professional perspective.
                </div>
              </div>

              <div className="framework-card step-3">
                <div className="card-number">3</div>
                <div className="card-title" style={{color: '#ea580c'}}>Context</div>
                <div className="card-subtitle">What do they need to know?</div>
                <div className="card-content">
                  Make it relevant to your situation. Include audience, constraints, and background details.
                </div>
              </div>

              <div className="framework-card step-4">
                <div className="card-number">4</div>
                <div className="card-title" style={{color: '#9333ea'}}>Action</div>
                <div className="card-subtitle">What should they do?</div>
                <div className="card-content">
                  Get what you actually need. "Focus on practical steps" instead of just generic information.
                </div>
              </div>

              <div className="framework-card step-5">
                <div className="card-number">5</div>
                <div className="card-title" style={{color: '#dc2626'}}>Format</div>
                <div className="card-subtitle">How should it look?</div>
                <div className="card-content">
                  Make it ready to use immediately. Specify tone, length, structure, and presentation style.
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'intro' && (
          <section className="section active" aria-labelledby="intro-title">
            <div className="section-header">
              <h1 id="intro-title" className="section-title">Watch How It Builds Up</h1>
              <p className="section-subtitle">See how each step makes your results dramatically better</p>
            </div>

            <div className="demo-container">
              <div className="steps-panel">
                {[0, 1, 2, 3, 4, 5].map((stepNum) => (
                  <div 
                    key={stepNum}
                    className={`step step-${stepNum} ${currentStep === stepNum ? 'active' : ''}`}
                    onClick={() => setCurrentStep(stepNum)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setCurrentStep(stepNum);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Step ${stepNum}: ${stepNum === 0 ? 'Basic Prompt' : stepNum === 1 ? 'Goal' : stepNum === 2 ? 'Role' : stepNum === 3 ? 'Context' : stepNum === 4 ? 'Action' : 'Format'}`}
                  >
                    <span className="step-number">{stepNum}</span>
                    <div>
                      <div style={{fontWeight: 600}}>
                        {stepNum === 0 ? 'Basic Prompt' : 
                         stepNum === 1 ? 'Goal' :
                         stepNum === 2 ? 'Role' :
                         stepNum === 3 ? 'Context' :
                         stepNum === 4 ? 'Action' : 'Format'}
                      </div>
                      <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                        {stepNum === 0 ? 'What most people start with' : 
                         stepNum === 1 ? 'What exactly do you want?' :
                         stepNum === 2 ? 'Who should help you?' :
                         stepNum === 3 ? 'What do they need to know?' :
                         stepNum === 4 ? 'What should they do?' : 'How should it look?'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="output-panel">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${progress}%`}}></div>
                </div>
                
                <div className="prompt-display copyable">
                  <CopyButton text={steps[currentStep].prompt.replace(/<[^>]*>/g, '')} />
                  <div dangerouslySetInnerHTML={{__html: steps[currentStep].prompt}} />
                </div>

                <div className="result-preview">
                  <div style={{fontWeight: 600, marginBottom: '10px', color: '#0c4a6e'}}>What you'll get:</div>
                  <div>{steps[currentStep].result}</div>
                </div>

                <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <button 
                    className="btn" 
                    onClick={prevStep} 
                    disabled={currentStep === 0}
                    aria-label="Go to previous step"
                  >
                    ← Previous
                  </button>
                  <button 
                    className="btn" 
                    onClick={nextStep} 
                    disabled={currentStep === steps.length - 1}
                    aria-label="Go to next step"
                  >
                    Next Step →
                  </button>
                  <button 
                    className="btn" 
                    onClick={resetDemo}
                    aria-label="Reset demo to beginning"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'examples' && (
          <section className="section active" aria-labelledby="examples-title">
            <div className="section-header">
              <h1 id="examples-title" className="section-title">Quick Start Examples</h1>
              <p className="section-subtitle">Three detailed walkthroughs showing the framework in action</p>
            </div>

            <div className="example-container">
              <div className="example-title">📝 Example 1: Explaining Technical Concepts</div>
              
              <div className="step-example step-1">
                <div className="step-label">Step 1 - Goal:</div>
                <div className="template-box copyable">
                  <CopyButton text="Explain cloud storage" className="copy-btn" />
                  Explain cloud storage
                </div>
              </div>

              <div className="step-example step-2">
                <div className="step-label">Step 2 - Role:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage." className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage.
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents." className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents.
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly." className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly.
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly. Use simple language with practical examples, keep it under 200 words." className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly. Use simple language with practical examples, keep it under 200 words.
                </div>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">📧 Example 2: Writing Customer Communications</div>
              
              <div className="step-example step-1">
                <div className="step-label">Step 1 - Goal:</div>
                <div className="template-box copyable">
                  <CopyButton text="Write an email about the delayed product launch." className="copy-btn" />
                  Write an email about the delayed product launch.
                </div>
              </div>

              <div className="step-example step-2">
                <div className="step-label">Step 2 - Role:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch." className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch.
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week." className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week.
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline." className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline.
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline. Use an honest but reassuring tone, include specific next steps and compensation offer." className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline. Use an honest but reassuring tone, include specific next steps and compensation offer.
                </div>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">💻 Example 3: Developer-to-Business Translation</div>
              
              <div className="step-example step-1">
                <div className="step-label">Step 1 - Goal:</div>
                <div className="template-box copyable">
                  <CopyButton text="Simplify this technical specification." className="copy-btn" />
                  Simplify this technical specification.
                </div>
              </div>

              <div className="step-example step-2">
                <div className="step-label">Step 2 - Role:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a senior developer who excels at translating technical details. Simplify this technical specification." className="copy-btn" />
                  Act as a senior developer who excels at translating technical details. Simplify this technical specification.
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature." className="copy-btn" />
                  Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature.
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature. Focus on business value and user impact rather than technical implementation." className="copy-btn" />
                  Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature. Focus on business value and user impact rather than technical implementation.
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature. Focus on business value and user impact rather than technical implementation. Use plain language with clear headings, include user benefits, and provide concrete examples." className="copy-btn" />
                  Act as a senior developer who excels at translating technical details. Simplify this technical specification for a product owner who is a non-technical customer and needs to understand the feature. Focus on business value and user impact rather than technical implementation. Use plain language with clear headings, include user benefits, and provide concrete examples.
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'templates' && (
          <section className="section active" aria-labelledby="templates-title">
            <div className="section-header">
              <h1 id="templates-title" className="section-title">Copy-Paste Templates</h1>
              <p className="section-subtitle">Ready-to-use formats for common workplace needs</p>
            </div>

            <div className="example-container">
              <div className="example-title">📝 For Explanations:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="[STEP 1] Explain [topic/concept]\n[STEP 2] Act as [appropriate expert - teacher, trainer, specialist]\n[STEP 3] to [specific audience] who [their situation/concerns]\n[STEP 4] [specific instruction - address concerns, focus on benefits, etc.]\n[STEP 5] Use [tone], [length], format as [structure]" 
                  className="copy-btn" 
                />
                [STEP 1] Explain <span className="template-placeholder">[topic/concept]</span><br/>
                [STEP 2] Act as <span className="template-placeholder">[appropriate expert - teacher, trainer, specialist]</span><br/>
                [STEP 3] to <span className="template-placeholder">[specific audience]</span> who <span className="template-placeholder">[their situation/concerns]</span><br/>
                [STEP 4] <span className="template-placeholder">[specific instruction - address concerns, focus on benefits, etc.]</span><br/>
                [STEP 5] Use <span className="template-placeholder">[tone]</span>, <span className="template-placeholder">[length]</span>, format as <span className="template-placeholder">[structure]</span>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">📊 For Meeting/Document Summaries:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="[STEP 1] Summarise [what specifically - key decisions, action items, main points]\n[STEP 2] Act as [project manager, executive assistant, team lead]\n[STEP 3] from [meeting type] where [context about what was discussed]\n[STEP 4] Focus on [what matters - actionable items, decisions made, next steps]\n[STEP 5] Format as [structure] with [specific requirements]" 
                  className="copy-btn" 
                />
                [STEP 1] Summarise <span className="template-placeholder">[what specifically - key decisions, action items, main points]</span><br/>
                [STEP 2] Act as <span className="template-placeholder">[project manager, executive assistant, team lead]</span><br/>
                [STEP 3] from <span className="template-placeholder">[meeting type]</span> where <span className="template-placeholder">[context about what was discussed]</span><br/>
                [STEP 4] Focus on <span className="template-placeholder">[what matters - actionable items, decisions made, next steps]</span><br/>
                [STEP 5] Format as <span className="template-placeholder">[structure]</span> with <span className="template-placeholder">[specific requirements]</span>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">💬 For Customer/Team Communications:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="[STEP 1] Write [type of communication] about [specific topic]\n[STEP 2] Act as [communications role - manager, specialist, coordinator]\n[STEP 3] for [audience] who [their situation/expectations]\n[STEP 4] [main objective - apologise and explain, update and reassure, etc.]\n[STEP 5] Use [appropriate tone], include [specific elements]" 
                  className="copy-btn" 
                />
                [STEP 1] Write <span className="template-placeholder">[type of communication]</span> about <span className="template-placeholder">[specific topic]</span><br/>
                [STEP 2] Act as <span className="template-placeholder">[communications role - manager, specialist, coordinator]</span><br/>
                [STEP 3] for <span className="template-placeholder">[audience]</span> who <span className="template-placeholder">[their situation/expectations]</span><br/>
                [STEP 4] <span className="template-placeholder">[main objective - apologise and explain, update and reassure, etc.]</span><br/>
                [STEP 5] Use <span className="template-placeholder">[appropriate tone]</span>, include <span className="template-placeholder">[specific elements]</span>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">🔧 For Simplifying Complex Information:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="[STEP 1] Simplify [technical content/process/concept]\n[STEP 2] Act as [translator role - business analyst, trainer, communicator]\n[STEP 3] for [non-technical audience] who [need to understand/use this]\n[STEP 4] Focus on [practical benefits, key points, what they need to know]\n[STEP 5] Use [simple language], format as [accessible structure]" 
                  className="copy-btn" 
                />
                [STEP 1] Simplify <span className="template-placeholder">[technical content/process/concept]</span><br/>
                [STEP 2] Act as <span className="template-placeholder">[translator role - business analyst, trainer, communicator]</span><br/>
                [STEP 3] for <span className="template-placeholder">[non-technical audience]</span> who <span className="template-placeholder">[need to understand/use this]</span><br/>
                [STEP 4] Focus on <span className="template-placeholder">[practical benefits, key points, what they need to know]</span><br/>
                [STEP 5] Use <span className="template-placeholder">[simple language]</span>, format as <span className="template-placeholder">[accessible structure]</span>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'scenarios' && (
          <section className="section active" aria-labelledby="scenarios-title">
            <div className="section-header">
              <h1 id="scenarios-title" className="section-title">Universal Workplace Scenarios</h1>
              <p className="section-subtitle">Color-coded examples showing the framework in real workplace situations</p>
            </div>

            <div className="color-legend">
              <div style={{fontWeight: 600, marginBottom: '12px'}}>Color Key:</div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#2563eb'}}></div>
                <span><strong>Step 1: Goal</strong> - What exactly you want</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#16a34a'}}></div>
                <span><strong>Step 2: Role</strong> - Who should help</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#ea580c'}}></div>
                <span><strong>Step 3: Context</strong> - Essential situation details</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#9333ea'}}></div>
                <span><strong>Step 4: Action</strong> - Specific instructions</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#dc2626'}}></div>
                <span><strong>Step 5: Format</strong> - How it should look</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Summarise the key outcomes from our project review meeting. Act as an experienced team leader where we discussed budget overruns and timeline adjustments. Focus on decisions made and impact on team members. Format as a clear email update with action items and who's responsible for each." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">🎯 Scenario 1: Team Updates</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Summarise the key outcomes from our project review meeting.</span> 
                <span className="step-2-text">Act as an experienced team leader</span> 
                <span className="step-3-text">where we discussed budget overruns and timeline adjustments.</span> 
                <span className="step-4-text">Focus on decisions made and impact on team members.</span> 
                <span className="step-5-text">Format as a clear email update with action items and who's responsible for each.</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Explain our new pricing structure to existing customers. Act as a customer success manager who are concerned about cost increases. Address their concerns about value and provide clear comparisons. Use a reassuring tone with specific examples of improved benefits." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">💬 Scenario 2: Client Explanations</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Explain our new pricing structure</span> 
                <span className="step-2-text">Act as a customer success manager.</span> 
                <span className="step-3-text">to existing customers who are concerned about cost increases.</span> 
                <span className="step-4-text">Address their concerns about value and provide clear comparisons.</span> 
                <span className="step-5-text">Use a reassuring tone with specific examples of improved benefits.</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Create a step-by-step guide for the new expense reporting system. Act as a process improvement specialist for employees who found the old system confusing. Focus on the most common tasks and potential pitfalls. Format as numbered steps with visual cues and troubleshooting tips." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">📋 Scenario 3: Process Documentation</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Create a step-by-step guide for the new expense reporting system.</span> 
                <span className="step-2-text">Act as a process improvement specialist</span> 
                <span className="step-3-text">for employees who found the old system confusing.</span> 
                <span className="step-4-text">Focus on the most common tasks and potential pitfalls.</span> 
                <span className="step-5-text">Format as numbered steps with visual cues and troubleshooting tips.</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Explain data security best practices to remote workers. Act as a skilled corporate trainer who may not understand the technical risks. Focus on practical daily habits and simple protective measures. Use conversational language with real-world examples and clear do's and don'ts." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">🎓 Scenario 4: Training Materials</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Explain data security best practices</span> 
                <span className="step-2-text">Act as a skilled corporate trainer.</span> 
                <span className="step-3-text">to remote workers who may not understand the technical risks.</span> 
                <span className="step-4-text">Focus on practical daily habits and simple protective measures.</span> 
                <span className="step-5-text">Use conversational language with real-world examples and clear do's and don'ts.</span>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'practice' && (
          <section className="section active" aria-labelledby="practice-title">
            <div className="section-header">
              <h1 id="practice-title" className="section-title">Try These Right Now</h1>
              <p className="section-subtitle">Hands-on exercises to practice the framework</p>
            </div>

            <div className="example-container">
              <div className="example-title">🎵 Instead of: "Write a social media post"</div>
              <div style={{marginBottom: '15px', color: '#6b7280'}}>Try all 5 steps:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="Act as a DJ community social media manager. Write a product launch announcement for Serato's new AI-powered stem separation feature targeting club DJs and producers who want to remix tracks in real-time during live performances. Generate excitement and drive downloads of the beta version with exclusive early access. Use an energetic, DJ-culture tone with mixing terminology, include relevant DJ hashtags, and keep under 280 characters for Twitter." 
                  className="copy-btn" 
                />
                Act as a DJ community social media manager. Write a product launch announcement for Serato's new AI-powered stem separation feature targeting club DJs and producers who want to remix tracks in real-time during live performances. Generate excitement and drive downloads of the beta version with exclusive early access. Use an energetic, DJ-culture tone with mixing terminology, include relevant DJ hashtags, and keep under 280 characters for Twitter.
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">📊 Instead of: "Summarise the report"</div>
              <div style={{marginBottom: '15px', color: '#6b7280'}}>Try all 5 steps:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="Act as a senior analyst. Summarise the key findings from the quarterly performance report for executives who need to make budget decisions. Focus on trends and recommendations. Format as executive summary with key metrics highlighted and clear next steps." 
                  className="copy-btn" 
                />
                Act as a senior analyst. Summarise the key findings from the quarterly performance report for executives who need to make budget decisions. Focus on trends and recommendations. Format as executive summary with key metrics highlighted and clear next steps.
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">📢 Instead of: "Write an announcement"</div>
              <div style={{marginBottom: '15px', color: '#6b7280'}}>Try all 5 steps:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="Act as a communications specialist. Write an announcement about the office relocation for all employees who will be affected by the move. Address timing, logistics, and impact on daily work. Use an informative but reassuring tone with clear timeline and support resources." 
                  className="copy-btn" 
                />
                Act as a communications specialist. Write an announcement about the office relocation for all employees who will be affected by the move. Address timing, logistics, and impact on daily work. Use an informative but reassuring tone with clear timeline and support resources.
              </div>
            </div>

            <div style={{background: '#f0f9ff', borderRadius: '12px', padding: '25px', textAlign: 'center', marginTop: '30px'}}>
              <h3 style={{color: '#0c4a6e', marginBottom: '15px'}}>Remember: Each step makes it better!</h3>
              <p style={{color: '#374151'}}>Use all 5 steps every time. Watch your results transform from generic to incredibly useful.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
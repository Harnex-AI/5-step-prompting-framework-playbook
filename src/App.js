import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('intro');
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

    const handleCopy = async () => {
      const success = await copyToClipboard(text);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <button 
        className={`${className} ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
      >
        {copied ? '✅ Copied!' : '📋 Copy'}
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
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <h1>🚀 AI Framework</h1>
          <p>5 Steps to Better Results</p>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={() => setActiveSection('intro')}
        >
          <div className="nav-title">Watch It Build</div>
          <div className="nav-desc">See the transformation</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'framework' ? 'active' : ''}`}
          onClick={() => setActiveSection('framework')}
        >
          <div className="nav-title">The 5-Step Pattern</div>
          <div className="nav-desc">Core framework explained</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveSection('examples')}
        >
          <div className="nav-title">Quick Start Examples</div>
          <div className="nav-desc">3 detailed walkthroughs</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveSection('templates')}
        >
          <div className="nav-title">Copy-Paste Templates</div>
          <div className="nav-desc">Ready-to-use formats</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveSection('scenarios')}
        >
          <div className="nav-title">Workplace Scenarios</div>
          <div className="nav-desc">Color-coded examples</div>
        </div>
        
        <div 
          className={`nav-item ${activeSection === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveSection('practice')}
        >
          <div className="nav-title">Try Right Now</div>
          <div className="nav-desc">Hands-on exercises</div>
        </div>
      </div>

      <div className="main-content">
        {activeSection === 'intro' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">Watch How It Builds Up</h1>
              <p className="section-subtitle">See how each step makes your results dramatically better</p>
            </div>

            <div className="demo-container">
              <div className="steps-panel">
                {[0, 1, 2, 3, 4, 5].map((stepNum) => (
                  <div 
                    key={stepNum}
                    className={`step step-${stepNum} ${currentStep === stepNum ? 'active' : ''}`}
                    onClick={() => setCurrentStep(stepNum)}
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
                  <button className="btn" onClick={prevStep} disabled={currentStep === 0}>← Previous</button>
                  <button className="btn" onClick={nextStep} disabled={currentStep === steps.length - 1}>Next Step →</button>
                  <button className="btn" onClick={resetDemo}>Reset</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'framework' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">The 5-Step Pattern for Everything</h1>
              <p className="section-subtitle">Use this structure for any prompt to get dramatically better results</p>
            </div>

            <div className="framework-grid">
              <div className="framework-card step-1">
                <div className="card-title" style={{color: '#2563eb'}}>Step 1: Goal</div>
                <div className="card-subtitle">What exactly do you want?</div>
                <div className="card-content">
                  Make it specific instead of vague. "Explain AI" becomes "Explain machine learning to marketing managers"
                </div>
              </div>

              <div className="framework-card step-2">
                <div className="card-title" style={{color: '#16a34a'}}>Step 2: Role</div>
                <div className="card-subtitle">Who should help you?</div>
                <div className="card-content">
                  Get expert-level thinking. "Act as an experienced trainer" gives you professional perspective.
                </div>
              </div>

              <div className="framework-card step-3">
                <div className="card-title" style={{color: '#ea580c'}}>Step 3: Context</div>
                <div className="card-subtitle">What do they need to know?</div>
                <div className="card-content">
                  Make it relevant to your situation. Include audience, constraints, and background details.
                </div>
              </div>

              <div className="framework-card step-4">
                <div className="card-title" style={{color: '#9333ea'}}>Step 4: Action</div>
                <div className="card-subtitle">What should they do?</div>
                <div className="card-content">
                  Get what you actually need. "Focus on practical steps" instead of just generic information.
                </div>
              </div>

              <div className="framework-card step-5">
                <div className="card-title" style={{color: '#dc2626'}}>Step 5: Format</div>
                <div className="card-subtitle">How should it look?</div>
                <div className="card-content">
                  Make it ready to use immediately. Specify tone, length, structure, and presentation style.
                </div>
              </div>
            </div>

            <div style={{background: '#f0f9ff', borderRadius: '12px', padding: '25px', textAlign: 'center'}}>
              <h3 style={{color: '#0c4a6e', marginBottom: '15px'}}>The Magic is in the Steps</h3>
              <p style={{color: '#374151'}}>Each step multiplies the quality. Don't skip steps - each one transforms generic into incredibly useful.</p>
            </div>
          </div>
        )}

        {activeSection === 'examples' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">Quick Start Examples</h1>
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
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage" className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents" className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly" className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly. Use simple language with practical examples, keep it under 200 words" className="copy-btn" />
                  Act as a patient IT trainer. Explain cloud storage to someone who's always saved files on their desktop and is worried about losing control of their documents. Address their concerns and explain the benefits clearly. Use simple language with practical examples, keep it under 200 words
                </div>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">📧 Example 2: Writing Customer Communications</div>
              
              <div className="step-example step-1">
                <div className="step-label">Step 1 - Goal:</div>
                <div className="template-box copyable">
                  <CopyButton text="Write an email about the delayed product launch" className="copy-btn" />
                  Write an email about the delayed product launch
                </div>
              </div>

              <div className="step-example step-2">
                <div className="step-label">Step 2 - Role:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch" className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week" className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline" className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline. Use an honest but reassuring tone, include specific next steps and compensation offer" className="copy-btn" />
                  Act as a professional communications manager. Write an email about the delayed product launch to our beta customers who were expecting access this week. Apologise sincerely and provide a realistic new timeline. Use an honest but reassuring tone, include specific next steps and compensation offer
                </div>
              </div>
            </div>

            <div className="example-container">
              <div className="example-title">🔧 Example 3: Simplifying Requirements</div>
              
              <div className="step-example step-1">
                <div className="step-label">Step 1 - Goal:</div>
                <div className="template-box copyable">
                  <CopyButton text="Simplify this technical specification" className="copy-btn" />
                  Simplify this technical specification
                </div>
              </div>

              <div className="step-example step-2">
                <div className="step-label">Step 2 - Role:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a business analyst who excels at translating technical details. Simplify this technical specification" className="copy-btn" />
                  Act as a business analyst who excels at translating technical details. Simplify this technical specification
                </div>
              </div>

              <div className="step-example step-3">
                <div className="step-label">Step 3 - Context:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers" className="copy-btn" />
                  Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers
                </div>
              </div>

              <div className="step-example step-4">
                <div className="step-label">Step 4 - Action:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers. Focus on customer benefits rather than technical implementation" className="copy-btn" />
                  Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers. Focus on customer benefits rather than technical implementation
                </div>
              </div>

              <div className="step-example step-5">
                <div className="step-label">Step 5 - Format:</div>
                <div className="template-box copyable">
                  <CopyButton text="Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers. Focus on customer benefits rather than technical implementation. Use bullet points with 'What this means for you' explanations" className="copy-btn" />
                  Act as a business analyst who excels at translating technical details. Simplify this technical specification for the sales team who need to explain features to non-technical customers. Focus on customer benefits rather than technical implementation. Use bullet points with "What this means for you" explanations
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add other sections similarly */}
        {activeSection === 'templates' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">Copy-Paste Templates</h1>
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
          </div>
        )}

        {activeSection === 'scenarios' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">Universal Workplace Scenarios</h1>
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
                text="Summarise the key outcomes Act as an experienced team leader. from our project review meeting where we discussed budget overruns and timeline adjustments. Focus on decisions made and impact on team members. Format as a clear email update with action items and who's responsible for each." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">🎯 Scenario 1: Team Updates</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Summarise the key outcomes</span> 
                <span className="step-2-text">Act as an experienced team leader.</span> 
                <span className="step-3-text">from our project review meeting where we discussed budget overruns and timeline adjustments.</span> 
                <span className="step-4-text">Focus on decisions made and impact on team members.</span> 
                <span className="step-5-text">Format as a clear email update with action items and who's responsible for each.</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Explain our new pricing structure Act as a customer success manager. to existing customers who are concerned about cost increases. Address their concerns about value and provide clear comparisons. Use a reassuring tone with specific examples of improved benefits." 
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
                text="Create a step-by-step guide for the new expense reporting system Act as a process improvement specialist. for employees who found the old system confusing. Focus on the most common tasks and potential pitfalls. Format as numbered steps with visual cues and troubleshooting tips." 
                className="copy-btn-light" 
              />
              <div className="scenario-title">📋 Scenario 3: Process Documentation</div>
              <div className="scenario-text" style={{lineHeight: 1.8}}>
                <span className="step-1-text">Create a step-by-step guide for the new expense reporting system</span> 
                <span className="step-2-text">Act as a process improvement specialist.</span> 
                <span className="step-3-text">for employees who found the old system confusing.</span> 
                <span className="step-4-text">Focus on the most common tasks and potential pitfalls.</span> 
                <span className="step-5-text">Format as numbered steps with visual cues and troubleshooting tips.</span>
              </div>
            </div>

            <div className="scenario-box copyable">
              <CopyButton 
                text="Explain data security best practices Act as a skilled corporate trainer. to remote workers who may not understand the technical risks. Focus on practical daily habits and simple protective measures. Use conversational language with real-world examples and clear do's and don'ts." 
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
          </div>
        )}

        {activeSection === 'practice' && (
          <div className="section active">
            <div className="section-header">
              <h1 className="section-title">Try These Right Now</h1>
              <p className="section-subtitle">Hands-on exercises to practice the framework</p>
            </div>

            <div className="example-container">
              <div className="example-title">🚀 Instead of: "Explain the new policy"</div>
              <div style={{marginBottom: '15px', color: '#6b7280'}}>Try all 5 steps:</div>
              <div className="template-box copyable">
                <CopyButton 
                  text="Act as an experienced software licensing manager. Explain the new software licensing policy to department heads who need to ensure their teams comply with usage limits. Focus on practical compliance steps and cost implications. Use clear, informative language with specific examples and a compliance checklist format." 
                  className="copy-btn" 
                />
                Act as an experienced software licensing manager. Explain the new software licensing policy to department heads who need to ensure their teams comply with usage limits. Focus on practical compliance steps and cost implications. Use clear, informative language with specific examples and a compliance checklist format.
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
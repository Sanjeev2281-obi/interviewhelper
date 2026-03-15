import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Bookmark, Play, RotateCcw, Lightbulb } from 'lucide-react'
import toast from 'react-hot-toast'

const MOCK_PROBLEM = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'easy',
  topic: 'Arrays',
  companies: ['Amazon', 'Google', 'Microsoft'],
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
  ],
  constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
  starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
  solution: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
  hints: [
    'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
    'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is target - x.',
    'What if we use a HashMap to reduce the time complexity?',
  ],
}

export default function ProblemDetailPage() {
  const { id } = useParams()
  const [code, setCode] = useState(MOCK_PROBLEM.starterCode)
  const [showSolution, setShowSolution] = useState(false)

  const [hintIdx, setHintIdx] = useState(0)
  const [solved, setSolved] = useState(false)
  const [activeTab, setActiveTab] = useState('problem')

  const handleRun = () => {
    toast.success('Code submitted! Output: [0, 1] ✓', { duration: 3000 })
    setSolved(true)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/dashboard/problems" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-body mb-5 transition-colors">
        <ChevronLeft size={15} /> Back to Problems
      </Link>

      <div className="grid lg:grid-cols-2 gap-5 h-[calc(100vh-160px)]">
        {/* Left: Problem */}
        <div className="card flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/5 px-5 pt-4 gap-1">
            {['problem', 'solution', 'hints'].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 text-sm font-body font-medium rounded-t-lg transition-colors capitalize ${
                  activeTab === t ? 'text-white border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t === 'solution' ? '🔒 Solution' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'problem' && (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-white">{MOCK_PROBLEM.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="badge-easy">{MOCK_PROBLEM.difficulty}</span>
                      <span className="text-slate-500 text-xs font-body">{MOCK_PROBLEM.topic}</span>
                      {MOCK_PROBLEM.companies.map(c => (
                        <span key={c} className="text-[10px] bg-white/5 text-slate-500 px-1.5 py-0.5 rounded font-body">{c}</span>
                      ))}
                    </div>
                  </div>
                  {solved && (
                    <div className="flex items-center gap-1.5 text-brand-400 text-sm font-body">
                      <CheckCircle size={16} /> Solved
                    </div>
                  )}
                </div>

                <p className="text-slate-300 text-sm font-body leading-relaxed whitespace-pre-line mb-5">
                  {MOCK_PROBLEM.description}
                </p>

                <div className="space-y-4 mb-5">
                  {MOCK_PROBLEM.examples.map((ex, i) => (
                    <div key={i} className="bg-white/3 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-slate-500 font-body mb-2">Example {i + 1}:</p>
                      <div className="code-block text-sm mb-2">
                        <span className="text-slate-500">Input: </span><span className="text-slate-200">{ex.input}</span>
                        {'\n'}
                        <span className="text-slate-500">Output: </span><span className="text-brand-400">{ex.output}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-body"><strong className="text-slate-400">Explanation:</strong> {ex.explanation}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-display font-semibold text-slate-300 mb-2">Constraints:</p>
                  <ul className="space-y-1">
                    {MOCK_PROBLEM.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-slate-500 font-mono flex items-start gap-2">
                        <span className="text-slate-700 mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'solution' && (
              <div>
                {!showSolution ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lightbulb size={28} className="text-yellow-400" />
                    </div>
                    <p className="text-slate-400 font-body text-sm mb-4">Try solving the problem first! Solutions are available for Pro users.</p>
                    <button onClick={() => setShowSolution(true)} className="btn-secondary">
                      Reveal Solution
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-400 text-sm font-body mb-4">Optimal solution using HashMap — O(n) time, O(n) space:</p>
                    <pre className="code-block text-xs text-slate-200 overflow-x-auto">{MOCK_PROBLEM.solution}</pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm font-body">Use hints only when stuck. Try to solve on your own first!</p>
                {MOCK_PROBLEM.hints.slice(0, hintIdx + 1).map((hint, i) => (
                  <div key={i} className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-4">
                    <p className="text-xs text-brand-400 font-display font-semibold mb-1">Hint {i + 1}</p>
                    <p className="text-slate-300 text-sm font-body">{hint}</p>
                  </div>
                ))}
                {hintIdx < MOCK_PROBLEM.hints.length - 1 && (
                  <button onClick={() => setHintIdx(prev => prev + 1)} className="btn-secondary text-xs">
                    Next Hint
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-slate-500 text-xs font-mono ml-2">Solution.java</span>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-lg font-mono">
                <option>Java</option>
                <option>Python</option>
                <option>C++</option>
              </select>
              <button onClick={() => setCode(MOCK_PROBLEM.starterCode)} className="btn-ghost text-xs p-2">
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-[#0d1117]">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-slate-200 font-mono text-sm p-5 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs text-slate-600 font-mono">{code.split('\n').length} lines</div>
            <div className="flex gap-2">
              <button onClick={() => toast('Testing against sample cases...')} className="btn-secondary text-xs px-4 py-2">
                Test
              </button>
              <button onClick={handleRun} className="btn-primary text-xs px-4 py-2">
                <Play size={13} /> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { Menu, Tooltip } from '@mantine/core'
import { ExpandableSearchBar } from './ExpandableSearchBar'
import {
  IconTrendingUp,
  IconChevronDown,
  IconRobot,
  IconMessage2,
  IconMask,
  IconUsers,
  IconReportAnalytics,
  IconShieldLock,
  IconTool,
  IconBriefcase,
  IconHeadset,
  IconBell,
  IconHistory,
  IconPlus,
  IconMicrophone,
  IconCheck,
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function App() {
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = React.useState(false);
  const [isLeftNavCollapsed, setIsLeftNavCollapsed] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('Closed Conversations');
  const [expandedSection, setExpandedSection] = React.useState<string>('Conversations');
  const [currentSubmenu, setCurrentSubmenu] = React.useState('Closed Conversations');
  const [selectedWorkspace, setSelectedWorkspace] = React.useState('Voice demo');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDummyMenu, setShowDummyMenu] = React.useState(true);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Menu configuration
  const getMenuItems = (section: string) => {
    if (!showDummyMenu) {
      // Secret version - real menu items
      switch (section) {
        case 'Insights':
          return ['Performance', 'Assistance', 'Leaderboard', 'Dashboard Builder', 'AI Analyst', 'Trends and Anomalies', 'Outcome Insights', 'Topic Discovery'];
        case 'Conversations':
          return ['Live Conversations', 'Closed Conversations', 'Agent Ops Center', 'Recordings'];
        case 'Opera':
          return ['Opera Rules', 'Opera Simulator', 'Blocks'];
        case 'Coaching':
          return ['Coaching Hub', 'Coaching Report', 'Training Simulator', 'Library'];
        case 'QM':
          return ['QM Report', 'QM Task Home'];
        case 'AI Agents':
          return ['AI Agents', 'Custom Code', 'Testing & Evaluation', 'AI Feedback'];
        case 'Admin':
          return ['Performance Config', 'Knowledge Base', 'Guided Workflows', 'Org Management', 'Notification Mgmt'];
        case 'System':
          return ['Data Management', 'Integrations', 'Webhooks', 'Jobs', 'Deployment Config', 'Role Permissions', 'Common Words', 'API Credentials', 'Config Wizard'];
        default:
          return [];
      }
    } else {
      // Dummy version - generic labels for certain sections
      switch (section) {
        case 'Insights':
          return ['Insights feature 1', 'Insights feature 2', 'Insights feature 3', 'Insights feature 4', 'Insights feature 5', 'Insights feature 6', 'Insights feature 7', 'Insights feature 8'];
        case 'Conversations':
          return ['Live Conversations', 'Closed Conversations', 'Agent Ops Center', 'Recordings'];
        case 'Opera':
          return ['Opera feature 1', 'Opera feature 2', 'Opera feature 3'];
        case 'Coaching':
          return ['Coaching feature 1', 'Coaching feature 2', 'Coaching feature 3', 'Coaching feature 4'];
        case 'QM':
          return ['QM feature 1', 'QM feature 2'];
        case 'AI Agents':
          return ['AI Agents feature 1', 'AI Agents feature 2', 'AI Agents feature 3', 'AI Agents feature 4'];
        case 'Admin':
          return ['Admin feature 1', 'Admin feature 2', 'Admin feature 3', 'Admin feature 4', 'Admin feature 5'];
        case 'System':
          return ['System feature 1', 'System feature 2', 'System feature 3', 'System feature 4', 'System feature 5', 'System feature 6', 'System feature 7', 'System feature 8', 'System feature 9'];
        default:
          return [];
      }
    }
  };

  // When right panel opens, auto-collapse left nav if it's open
  React.useEffect(() => {
    if (!isRightPanelCollapsed && !isLeftNavCollapsed) {
      setIsLeftNavCollapsed(true);
    }
  }, [isRightPanelCollapsed]);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Group calibration questions
    if (input.includes('what is group calibration')) {
      return "Group Calibration is a feature in Cresta's Quality Management (QM) system that allows multiple reviewers to evaluate the same conversations together in real-time. This ensures consistency in scoring and helps align your team on quality standards.\n\nKey benefits:\n• Establishes shared understanding of quality criteria\n• Reduces scoring variability between reviewers\n• Provides a collaborative learning experience\n• Helps onboard new QM reviewers faster\n\nYou can access Group Calibration from QM > QM Task Home > QM Calibration.";
    }

    if (input.includes('how does group calibration speed up')) {
      return "Group Calibration speeds up your reviewers' workflows in several ways:\n\n**1. Reduces Re-calibration Time**\nBy aligning reviewers upfront, you avoid the need to go back and adjust scores later due to inconsistencies.\n\n**2. Faster Consensus Building**\nReviewers can discuss and resolve scoring differences in real-time during calibration sessions, rather than through back-and-forth messages.\n\n**3. Improved First-Pass Accuracy**\nOnce calibrated, reviewers make more consistent decisions independently, reducing the need for oversight and corrections.\n\n**4. Streamlined Onboarding**\nNew reviewers get up to speed faster by learning from experienced team members in live sessions.\n\nThis ultimately means your QM team can review more conversations with higher quality and less rework!";
    }

    // Greeting patterns
    if (input.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm the Support AI Agent. I'm here to help you with any questions about Cresta's platform, insights, performance metrics, or general inquiries. What can I assist you with today?";
    }

    // Help/What can you do
    if (input.includes('help') || input.includes('what can you do') || input.includes('how can you help')) {
      return "I can assist you with:\n\n• Explaining Cresta's features and capabilities\n• Navigating the Insights dashboard\n• Understanding performance metrics and leaderboards\n• Answering questions about AI Agents, coaching, and quality management\n• General support and troubleshooting\n\nFeel free to ask me anything!";
    }

    // Insights related
    if (input.includes('insight') || input.includes('dashboard') || input.includes('performance')) {
      return "The Insights section provides comprehensive analytics on your team's performance. You can explore:\n\n• **Performance**: Track key metrics and KPIs\n• **Leaderboard**: See top performers and rankings\n• **Dashboard Builder**: Create custom dashboards\n• **AI Analyst**: Get AI-powered insights\n• **Trends and Anomalies**: Identify patterns in your data\n\nWould you like to know more about any specific area?";
    }

    // AI Agents
    if (input.includes('ai agent') || input.includes('automation')) {
      return "Cresta's AI Agents help automate and enhance customer interactions. They can:\n\n• Provide real-time suggestions to agents during conversations\n• Automate routine tasks and responses\n• Analyze conversation quality and sentiment\n• Surface relevant knowledge base articles\n\nWould you like to learn how to configure or deploy an AI Agent?";
    }

    // Leaderboard
    if (input.includes('leaderboard') || input.includes('ranking') || input.includes('top performer')) {
      return "The Leaderboard shows your team's performance rankings based on various metrics like:\n\n• Average Handle Time (AHT)\n• Customer Satisfaction (CSAT)\n• First Call Resolution (FCR)\n• Conversion rates\n\nYou can customize the metrics and time periods to focus on what matters most to your team.";
    }

    // Coaching
    if (input.includes('coach') || input.includes('training')) {
      return "Cresta's Coaching features help managers provide targeted feedback and development opportunities:\n\n• Review flagged conversations\n• Provide in-app feedback and comments\n• Track coaching sessions and outcomes\n• Identify skill gaps and training needs\n\nWould you like guidance on setting up a coaching workflow?";
    }

    // Technical questions
    if (input.includes('how to') || input.includes('how do i')) {
      return "I'd be happy to help you with that! Could you provide a bit more detail about what you're trying to accomplish? For example:\n\n• Are you trying to create a dashboard?\n• Do you need to configure a specific feature?\n• Are you looking for integration instructions?\n\nThe more context you provide, the better I can assist you.";
    }

    // Default intelligent response
    const responses = [
      `That's an interesting question about ${userInput.split(' ').slice(0, 3).join(' ')}. Based on Cresta's capabilities, I can help you explore this further. Could you provide more context about what you're trying to achieve?`,
      `I understand you're asking about "${userInput}". In the Cresta platform, there are several ways to approach this. Would you like me to walk you through the available options?`,
      `Great question! To give you the most accurate answer, it would help to know a bit more about your use case. Are you working with a specific team, metric, or feature?`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = textToSend;
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800 + Math.random() * 400); // Variable delay between 800-1200ms
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#ebf0f5] flex h-screen w-screen overflow-hidden relative">
      {/* Left Sidebar */}
      <div
        className={`
          group bg-[#ebf0f5] flex flex-col fixed left-0 top-0 h-full z-40
          transition-all duration-300 ease-in-out
          ${isLeftNavCollapsed ? 'w-[60px] hover:w-[208px] hover:shadow-[2px_0_16px_rgba(0,0,0,0.1)]' : 'w-[208px]'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center pt-6 pb-3 px-4 ${isLeftNavCollapsed ? 'justify-center group-hover:justify-start' : 'justify-start'}`}>
          {/* Full logo - shown when expanded or hovering */}
          <div className={isLeftNavCollapsed ? 'hidden group-hover:block' : 'block'}>
            <svg width="93" height="20" viewBox="0 0 838 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M172.491 101.016V100.986C170.021 98.7158 166.882 97.2859 163.492 96.9059C157.453 96.2359 151.624 99.3058 148.325 104.406C142.786 112.955 136.167 121.125 128.628 128.675C120.339 136.965 111.251 144.174 101.832 149.984L99.9225 151.144L102.022 151.984C106.321 153.594 111.131 155.004 116.12 155.794L117.04 155.954L117.78 155.394C124.868 150.304 131.697 144.504 138.066 138.125C146.385 129.805 153.704 120.775 159.793 111.275C159.793 111.275 160.193 110.675 160.833 109.815C161.542 108.855 163.032 109.045 163.492 110.145C163.732 110.725 163.912 111.345 164.092 112.055C168.021 130.425 164.922 145.824 155.333 155.404C152.164 158.574 148.335 161.064 143.945 162.804C139.556 164.534 134.597 165.544 129.208 165.764C122.509 166.054 115.22 165.134 107.671 163.114C99.3226 160.964 91.9638 157.634 86.8946 154.984C74.3267 148.554 62.0987 139.555 51.2305 128.685C39.4924 116.945 29.924 103.616 23.435 89.9761C29.934 76.3365 39.4924 63.0069 51.2305 51.2673C61.9787 40.5176 74.0667 31.5878 86.5047 25.168C91.6339 22.4681 99.2326 18.9882 107.901 16.7783C115.37 14.7884 122.589 13.9084 129.218 14.1884C134.607 14.4084 139.566 15.4183 143.955 17.1483C148.345 18.8782 152.174 21.3682 155.343 24.5481C164.922 34.1278 168.041 49.5273 164.102 67.8967C163.932 68.6067 163.742 69.2167 163.502 69.7967C163.052 70.9066 161.552 71.0866 160.843 70.1267C160.203 69.2567 159.813 68.6667 159.813 68.6667C153.714 59.177 146.405 50.1373 138.086 41.8175C131.707 35.4377 124.888 29.6479 117.8 24.5481L117.01 24.0081L116.14 24.1481C111.161 24.9281 106.351 26.348 102.052 27.958L99.9425 28.7579L101.862 29.9579C111.291 35.7677 120.369 42.9675 128.658 51.2673C136.307 58.917 143.015 67.2068 148.585 75.8965C151.524 80.4763 156.503 83.1363 161.792 83.1363C162.732 83.1363 163.682 83.0463 164.632 82.8763C167.601 82.3363 170.331 80.9763 172.521 78.9564C174.88 76.7765 176.5 73.9166 177.19 70.6967C179.549 59.717 179.769 49.4473 177.88 40.1576C175.85 30.1779 171.451 21.7381 164.812 15.1084C156.063 6.39862 143.955 1.47876 129.788 0.868783C117.47 0.348799 103.752 3.09872 89.9342 8.86854C76.1264 3.10872 62.3987 0.348799 50.0907 0.868783C35.923 1.46877 23.815 6.39861 15.0864 15.1283C6.34782 23.8681 1.42863 35.9677 0.818726 50.1473C0.298811 62.4669 3.04836 76.1865 8.81742 90.0061V90.0261C11.177 95.1859 14.0666 101.136 17.1361 106.586C23.725 117.745 32.0836 128.455 41.792 138.165C50.8405 147.214 60.7789 155.084 71.1272 161.454C71.9771 161.974 71.7871 163.264 70.8173 163.504C63.7584 165.274 56.9495 166.064 50.6606 165.794C45.2715 165.574 40.3123 164.564 35.923 162.834C31.5337 161.104 27.7043 158.614 24.5348 155.434C21.3654 152.264 18.8758 148.434 17.1361 144.044C15.4063 139.655 14.3965 134.695 14.1765 129.305C14.0566 126.365 14.1307 123.313 14.4607 120.184C14.4607 120.114 14.5365 119.455 14.5365 119.385L14.1365 118.755C11.277 114.475 8.46748 109.465 5.90789 104.486L4.59811 101.906L3.82823 104.716C1.52861 113.435 0.498779 121.945 0.828725 129.855C1.42863 144.024 6.35782 156.134 15.0864 164.864C23.815 173.594 35.923 178.523 50.0907 179.123C51.0705 179.163 52.0703 179.193 53.0602 179.193C64.5983 179.193 77.2262 176.433 89.9342 171.134C102.642 176.423 115.28 179.193 126.808 179.193C127.798 179.193 128.798 179.173 129.778 179.123C143.945 178.523 156.053 173.594 164.782 164.864C171.411 158.234 175.81 149.804 177.85 139.815C179.739 130.525 179.509 120.245 177.16 109.275C176.47 106.046 174.86 103.196 172.491 101.016ZM16.4462 70.8467C14.6665 63.7769 13.8866 56.9671 14.1565 50.6673C14.3765 45.2774 15.3863 40.3176 17.1161 35.9277C18.8458 31.5378 21.3354 27.708 24.5149 24.5381C27.6843 21.3682 31.5137 18.8782 35.903 17.1383C40.2923 15.4083 45.2515 14.3984 50.6406 14.1784C51.4404 14.1484 52.2603 14.1184 53.0702 14.1184C58.6793 14.1184 64.6483 14.9084 70.8173 16.4683C71.7871 16.7183 71.9871 17.9883 71.1272 18.5082C60.7789 24.8781 50.8305 32.7578 41.772 41.8075C32.7235 50.8573 24.8448 60.807 18.4758 71.1666C17.9559 72.0166 16.6761 71.8166 16.4362 70.8567L16.4462 70.8467Z" fill="#25252A"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M740.313 52.511H704.183V140.741L689.033 140.771V52.531L652.903 52.501V38.791H740.313V52.501V52.511Z" fill="#25252A"/>
              <path d="M537.183 52.5088H477.933V81.5688H523.953V94.7088H477.933V127.039H537.183V140.749H463.233V38.7988H537.183V52.4988V52.5088Z" fill="#25252A"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M322.203 109.5L321.663 109.22L321.373 109.76C314.713 122.33 302.903 129.85 288.273 129.85C265.953 129.85 249.383 112.73 249.383 89.7701C249.383 66.8101 265.953 49.6901 288.273 49.6901C302.903 49.6901 314.723 57.2101 321.373 69.7801L321.673 70.3001L322.203 70.0401L333.923 64.0301L334.493 63.7301L334.193 63.1901C325.223 46.1601 308.183 35.8301 288.273 35.8301C258.483 35.8301 235.073 59.0901 235.073 89.7601C235.073 120.43 258.483 143.69 288.273 143.69C308.183 143.69 325.223 133.35 334.193 116.33L334.493 115.78L333.933 115.49L322.213 109.48L322.203 109.5Z" fill="#25252A"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M631.954 93.4618C627.054 88.8818 620.254 85.7418 612.364 83.9018L592.524 79.3818L591.364 79.1118C585.714 77.7118 581.804 75.8818 579.304 73.6418C576.764 71.3618 575.494 68.5118 575.494 64.6218C575.494 60.7318 577.504 56.8718 581.354 54.1118C585.254 51.3218 591.044 49.5318 598.294 49.5018C613.244 49.4418 621.294 57.1018 625.944 67.9718L638.354 61.6218C633.064 46.0218 619.624 35.8418 598.434 35.8418C576.704 35.8418 560.134 47.9318 560.134 65.1718C560.134 72.9518 563.244 79.2718 568.454 84.0518C573.594 88.7618 580.694 91.9118 588.684 93.7318L606.064 97.6618C612.664 99.1718 617.324 101.112 620.284 103.552C623.104 105.872 624.504 108.722 624.504 112.562C624.504 117.992 622.154 122.272 617.974 125.282C613.704 128.352 607.364 130.202 599.424 130.202C590.884 130.202 584.314 127.852 579.414 124.112C574.704 120.522 572.004 116.632 568.664 109.772L556.634 115.932C561.644 130.932 576.524 143.712 599.434 143.712C622.344 143.712 640.004 131.192 640.004 112.142C640.004 104.532 637.064 98.2518 631.934 93.4618H631.954Z" fill="#25252A"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M821.203 140.769H837.243L802.593 48.3885C800.173 41.6085 793.983 37.2285 786.773 37.2285H786.743C779.523 37.2385 773.333 41.6285 770.933 48.4285L736.393 140.759H752.423L761.283 117.259H812.303L821.193 140.759L821.203 140.769ZM766.373 103.819L785.463 51.0085C785.943 49.6885 787.813 49.6885 788.283 51.0085L807.243 103.819H766.373Z" fill="#25252A"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M411.253 99.9605C423.423 98.1505 438.273 86.7805 438.273 69.3106C438.273 51.8406 425.753 38.8105 404.483 38.8105H358.323V140.751H372.883V98.2905C372.883 96.9405 374.513 96.2806 375.453 97.2406L417.913 140.741H436.673L396.833 100.501C404.043 100.501 408.273 100.351 411.233 99.9605H411.253ZM372.903 52.4905H404.493C416.583 52.4905 423.423 59.4006 423.423 69.3106C423.423 79.2206 416.583 87.8005 404.493 87.8005H372.903V52.5005V52.4905Z" fill="#25252A"/>
            </svg>
          </div>

          {/* Small logo - shown when collapsed and not hovering */}
          <div className={isLeftNavCollapsed ? 'block group-hover:hidden' : 'hidden'}>
            <svg width="20" height="20" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M172.539 101.016V100.986C170.069 98.7158 166.93 97.2858 163.54 96.9059C157.501 96.2359 151.672 99.3058 148.373 104.406C142.834 112.955 136.215 121.125 128.676 128.675C120.387 136.965 111.299 144.174 101.88 149.984L99.9706 151.144L102.07 151.984C106.37 153.594 111.179 155.004 116.168 155.794L117.088 155.954L117.828 155.394C124.917 150.304 131.745 144.504 138.114 138.125C146.433 129.805 153.752 120.775 159.841 111.275C159.841 111.275 160.241 110.675 160.881 109.815C161.591 108.855 163.08 109.045 163.54 110.145C163.78 110.725 163.96 111.345 164.14 112.055C168.069 130.425 164.97 145.824 155.382 155.404C152.212 158.574 148.383 161.064 143.993 162.804C139.604 164.534 134.645 165.544 129.256 165.764C122.557 166.054 115.268 165.134 107.719 163.114C99.3707 160.964 92.0119 157.634 86.9427 154.984C74.3748 148.554 62.1468 139.555 51.2786 128.685C39.5405 116.945 29.9721 103.616 23.4831 89.9761C29.9821 76.3365 39.5405 63.0069 51.2786 51.2673C62.0268 40.5176 74.1148 31.5878 86.5528 25.168C91.682 22.4681 99.2807 18.9882 107.949 16.7783C115.418 14.7884 122.637 13.9084 129.266 14.1884C134.655 14.4084 139.614 15.4183 144.003 17.1483C148.393 18.8782 152.222 21.3682 155.392 24.5481C164.97 34.1278 168.089 49.5273 164.15 67.8967C163.98 68.6067 163.79 69.2167 163.55 69.7967C163.1 70.9067 161.601 71.0866 160.891 70.1267C160.251 69.2567 159.861 68.6667 159.861 68.6667C153.762 59.177 146.453 50.1373 138.134 41.8175C131.755 35.4377 124.937 29.6479 117.848 24.5481L117.058 24.0081L116.188 24.1481C111.209 24.9281 106.4 26.348 102.1 27.958L99.9906 28.7579L101.91 29.9579C111.339 35.7677 120.417 42.9675 128.706 51.2673C136.355 58.917 143.064 67.2068 148.633 75.8965C151.572 80.4764 156.551 83.1363 161.84 83.1363C162.78 83.1363 163.73 83.0463 164.68 82.8763C167.65 82.3363 170.379 80.9764 172.569 78.9564C174.928 76.7765 176.548 73.9166 177.238 70.6967C179.598 59.717 179.818 49.4473 177.928 40.1576C175.898 30.1779 171.499 21.7381 164.86 15.1084C156.111 6.39862 144.003 1.47876 129.836 0.868783C117.518 0.348799 103.8 3.09872 89.9822 8.86854C76.1745 3.10872 62.4467 0.348799 50.1388 0.868783C35.9711 1.46877 23.8631 6.39861 15.1345 15.1283C6.39592 23.8681 1.47672 35.9677 0.866822 50.1473C0.346907 62.4669 3.09646 76.1865 8.86551 90.0061V90.0261C11.2251 95.1859 14.1147 101.136 17.1842 106.586C23.7731 117.745 32.1317 128.455 41.8401 138.165C50.8886 147.214 60.827 155.084 71.1753 161.454C72.0252 161.974 71.8352 163.264 70.8654 163.504C63.8065 165.274 56.9976 166.064 50.7087 165.794C45.3196 165.574 40.3604 164.564 35.9711 162.834C31.5818 161.104 27.7524 158.614 24.5829 155.434C21.4135 152.264 18.9239 148.434 17.1842 144.044C15.4544 139.655 14.4446 134.695 14.2246 129.305C14.1047 126.365 14.1788 123.313 14.5088 120.184C14.5088 120.114 14.5846 119.455 14.5846 119.385L14.1846 118.755C11.3251 114.475 8.51557 109.465 5.95599 104.486L4.6462 101.906L3.87633 104.716C1.57671 113.435 0.546874 121.945 0.87682 129.855C1.47672 144.024 6.40592 156.134 15.1345 164.864C23.8631 173.594 35.9711 178.523 50.1388 179.123C51.1186 179.163 52.1184 179.193 53.1083 179.193C64.6464 179.193 77.2743 176.433 89.9822 171.134C102.69 176.423 115.328 179.193 126.856 179.193C127.846 179.193 128.846 179.173 129.826 179.123C143.993 178.523 156.101 173.594 164.83 164.864C171.459 158.234 175.858 149.804 177.898 139.815C179.788 130.525 179.558 120.245 177.208 109.275C176.518 106.046 174.908 103.196 172.539 101.016ZM16.4943 70.8467C14.7146 63.7769 13.9347 56.9671 14.2046 50.6673C14.4246 45.2774 15.4344 40.3176 17.1642 35.9277C18.8939 31.5378 21.3835 27.708 24.5629 24.5381C27.7324 21.3682 31.5618 18.8782 35.9511 17.1383C40.3404 15.4083 45.2996 14.3984 50.6887 14.1784C51.4885 14.1484 52.3084 14.1184 53.1183 14.1184C58.7274 14.1184 64.6964 14.9084 70.8654 16.4683C71.8352 16.7183 72.0352 17.9883 71.1753 18.5082C60.827 24.8781 50.8786 32.7578 41.8201 41.8075C32.7716 50.8573 24.8929 60.807 18.5239 71.1666C18.004 72.0166 16.7242 71.8166 16.4843 70.8567L16.4943 70.8467Z" fill="#25252A"/>
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto mt-3.5">
          {/* Full navigation - shown when expanded or hovering */}
          <div className={isLeftNavCollapsed ? 'hidden group-hover:flex group-hover:flex-col' : 'flex flex-col'}>
              {/* Insights Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'Insights' ? '' : 'Insights')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconTrendingUp size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">Insights</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'Insights' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'Insights' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('Insights').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Conversations Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'Conversations' ? '' : 'Conversations')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconMessage2 size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">Conversations</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'Conversations' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'Conversations' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('Conversations').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Opera Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'Opera' ? '' : 'Opera')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconMask size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">Opera</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'Opera' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'Opera' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('Opera').map((item, index) => {
                    // Show plus button for the first item in secret mode and if it's "Opera Rules"
                    if (index === 0 && !showDummyMenu && item === 'Opera Rules') {
                      return (
                        <div key={item} className={`flex items-center justify-between py-1.5 -mr-2 ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}>
                          <button onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }} className="flex-1 text-left cursor-pointer">
                            <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center cursor-pointer rounded hover:bg-white transition-colors">
                            <IconPlus size={12} stroke={1.5} className="text-[#5d666f]" />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={item}
                        onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                        className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                      >
                        <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Coaching Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'Coaching' ? '' : 'Coaching')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconUsers size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">Coaching</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'Coaching' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'Coaching' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('Coaching').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* QM Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'QM' ? '' : 'QM')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconReportAnalytics size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">QM</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'QM' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'QM' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('QM').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* AI Agents Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'AI Agents' ? '' : 'AI Agents')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconRobot size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">AI Agents</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'AI Agents' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'AI Agents' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('AI Agents').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Admin Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'Admin' ? '' : 'Admin')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconShieldLock size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">Admin</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'Admin' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'Admin' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('Admin').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* System Section */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'System' ? '' : 'System')}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#dee5eb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconTool size={16} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-xs font-semibold text-[#25252a]">System</span>
                </div>
                <IconChevronDown
                  size={14}
                  stroke={1.5}
                  className={`text-[#25252a] transition-transform ${expandedSection === 'System' ? '' : '-rotate-90'}`}
                />
              </div>
              {expandedSection === 'System' && (
                <div className="flex flex-col pl-10 pr-4 pb-2 overflow-hidden transition-all duration-200 ease-in-out animate-slideDown">
                  {getMenuItems('System').map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedMenuItem(item); setCurrentSubmenu(item); }}
                      className={`py-1.5 text-left cursor-pointer ${selectedMenuItem === item ? 'px-2 bg-white rounded-[8px] shadow-sm -mx-2' : ''}`}
                    >
                      <span className={`text-sm ${selectedMenuItem === item ? 'text-[#25252a] font-medium' : 'text-[#5d666f]'}`}>{item}</span>
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-[#dee5eb]">
                    <button
                      onClick={() => setShowDummyMenu(!showDummyMenu)}
                      className="w-full py-1.5 px-2 text-left cursor-pointer rounded hover:bg-[#dee5eb] transition-colors"
                    >
                      <span className="text-xs font-medium text-[#5d666f]">
                        {showDummyMenu ? 'Show full menu' : 'Show dummy menu'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
          </div>

          {/* Collapsed navigation - shown when collapsed and not hovering */}
          <div className={isLeftNavCollapsed ? 'flex flex-col items-center gap-3 pt-2 group-hover:hidden' : 'hidden'}>
              {/* Collapsed state - show only icons */}
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconTrendingUp size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconMessage2 size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconMask size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconUsers size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconReportAnalytics size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconRobot size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconShieldLock size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#dee5eb] transition-colors cursor-pointer">
                <IconTool size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsLeftNavCollapsed(!isLeftNavCollapsed)}
          className={`flex items-center gap-2 px-4 py-2 mb-2 hover:bg-[#dee5eb] transition-colors w-full cursor-pointer ${
            isLeftNavCollapsed ? 'justify-center group-hover:justify-start' : ''
          }`}
        >
          {isLeftNavCollapsed ? (
            <IconChevronRight size={16} stroke={1.5} className="text-[#25252a]" />
          ) : (
            <IconChevronLeft size={16} stroke={1.5} className="text-[#25252a]" />
          )}
          {/* Show "Collapse" when expanded */}
          {!isLeftNavCollapsed && (
            <span className="text-xs font-semibold text-[#25252a]">
              Collapse
            </span>
          )}
          {/* Show "Expand" when collapsed and hovering */}
          {isLeftNavCollapsed && (
            <span className="text-xs font-semibold text-[#25252a] hidden group-hover:inline">
              Expand
            </span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isLeftNavCollapsed ? 'ml-[60px]' : 'ml-[208px]'}`}>
        {/* Top Header */}
        <div className="bg-[#ebf0f5] flex items-center pr-6 pt-5 pb-3 gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
            <Menu shadow="md" position="bottom-start" offset={4}>
              <Menu.Target>
                <div className="flex items-center gap-1.5 cursor-pointer pl-2 pr-1 py-1 rounded hover:bg-[#dee5eb] transition-colors">
                  <IconBriefcase size={14} stroke={1.5} className="text-[#25252a]" />
                  <span className="text-sm font-medium text-[#25252a]">{selectedWorkspace}</span>
                  <IconChevronDown size={12} stroke={1.5} className="text-[#5d666f]" />
                </div>
              </Menu.Target>

              <Menu.Dropdown className="!min-w-[180px] !border-[#dee5eb] !rounded-lg">
                <div className="px-3 pt-2 pb-1">
                  <span className="text-[10px] font-medium text-[#a1b0b7] uppercase tracking-wide">Use case</span>
                </div>
                {['Voice demo', 'Chat demo', 'Walter dev', 'Telco', 'Insurance', 'Retail'].map((workspace) => (
                  <Menu.Item
                    key={workspace}
                    onClick={() => setSelectedWorkspace(workspace)}
                    className={`!text-sm !cursor-pointer ${
                      selectedWorkspace === workspace
                        ? '!bg-[#f8f9fa] !text-[#25252a] !font-medium'
                        : '!text-[#5d666f]'
                    }`}
                    rightSection={selectedWorkspace === workspace ? <IconCheck size={14} stroke={2} className="text-[#25252a]" /> : null}
                  >
                    {workspace}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <span className="text-sm text-[#5d666f]">/</span>
            <span className="text-sm font-medium text-[#25252a]">{currentSubmenu}</span>
          </div>

          {/* Search Bar - Shifted right for optical centering */}
          <div className="flex-1 flex justify-center min-w-0">
            <ExpandableSearchBar
              onSearch={(query) => {
                console.log('Searching for:', query);
              }}
              onAskAI={(question) => {
                setIsRightPanelCollapsed(false);
                handleSendMessage(question);
              }}
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Tooltip label="Support AI Agent" position="bottom" withArrow>
              <button
                onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                className={`w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer ${
                  isRightPanelCollapsed ? 'hover:bg-[#dee5eb]' : 'bg-white shadow-sm hover:bg-[#f8f9fa]'
                }`}
              >
                <IconHeadset size={16} stroke={1.5} className="text-[#25252a]" />
              </button>
            </Tooltip>
            <Tooltip label="2 critical out of 7 unread notifications" position="bottom" withArrow>
              <button
                onClick={() => {
                  setSelectedMenuItem('Notifications');
                  setCurrentSubmenu('Notifications');
                }}
                className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors relative ${
                  currentSubmenu === 'Notifications' ? 'bg-white shadow-sm hover:bg-[#f8f9fa]' : 'hover:bg-[#dee5eb]'
                }`}
              >
                <IconBell size={16} stroke={1.5} className="text-[#25252a]" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
            </Tooltip>
            <Tooltip label="Language and feedbacks" position="bottom" withArrow>
              <div className="flex items-center gap-1 h-7 px-2 rounded cursor-pointer hover:bg-[#dee5eb] transition-colors">
                <span className="text-2xl">🇺🇸</span>
                <IconChevronDown size={12} stroke={1.5} className="text-[#25252a]" />
              </div>
            </Tooltip>
            <Menu shadow="md" position="bottom-end" offset={4}>
              <Menu.Target>
                <div className="flex items-center gap-1 h-7 px-2 rounded cursor-pointer hover:bg-[#dee5eb] transition-colors">
                  <img
                    src={`${import.meta.env.BASE_URL}profile.png`}
                    alt="Profile"
                    className="w-7 h-7 rounded-full border border-[#dee5eb] object-cover"
                  />
                  <IconChevronDown size={12} stroke={1.5} className="text-[#25252a]" />
                </div>
              </Menu.Target>

              <Menu.Dropdown className="!min-w-[200px] !border-[#dee5eb] !rounded-lg">
                <Menu.Item
                  leftSection={<IconUser size={16} stroke={1.5} className="text-[#5d666f]" />}
                  className="!text-sm !cursor-pointer !text-[#5d666f] hover:!bg-[#f8f9fa]"
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={16} stroke={1.5} className="text-[#5d666f]" />}
                  className="!text-sm !cursor-pointer !text-[#5d666f] hover:!bg-[#f8f9fa]"
                >
                  Notification settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={16} stroke={1.5} className="text-[#5d666f]" />}
                  className="!text-sm !cursor-pointer !text-[#5d666f] hover:!bg-[#f8f9fa]"
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 -ml-8 pl-10">
          <div className="bg-white rounded-xl border border-[#dee5eb] h-full shadow-[0_0_25px_0px_rgba(0,0,0,0.05)]" />
        </div>
      </div>

      {/* Right Sidebar - Chat Panel */}
      <div
        className={`
          bg-[#ebf0f5] flex flex-col border-l border-[#dee5eb] overflow-hidden
          transition-all duration-300 ease-in-out
          ${isRightPanelCollapsed ? 'w-0 border-0' : 'w-[340px]'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-2 border-b border-[#dee5eb] bg-[#ebf0f5]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsRightPanelCollapsed(true)}
              className="w-7 h-7 flex items-center justify-center bg-white border border-[#dee5eb] rounded hover:bg-[#f8f9fa] transition-colors cursor-pointer"
            >
              <IconChevronRight size={16} stroke={1.5} className="text-[#25252a]" />
            </button>
            <span className="text-sm font-semibold text-[#25252a]">Support AI Agent</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMessages([])}
              className="w-7 h-7 flex items-center justify-center bg-white border border-[#dee5eb] rounded hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              title="Clear chat"
            >
              <IconHistory size={16} stroke={1.5} className="text-[#25252a]" />
            </button>
            <button
              onClick={() => setMessages([])}
              className="w-7 h-7 flex items-center justify-center bg-white border border-[#dee5eb] rounded hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              title="New chat"
            >
              <IconPlus size={16} stroke={1.5} className="text-[#25252a]" />
            </button>
          </div>
        </div>

        {/* Chat Content Area - fills remaining space */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#ebf0f5]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <IconHeadset size={48} stroke={1.5} className="text-[#a1b0b7] mb-4" />
              <h3 className="text-lg font-semibold text-[#25252a] mb-2">Support AI Agent</h3>
              <p className="text-sm text-[#5d666f]">Ask me anything! I'm here to help.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'user' ? (
                    <div className="max-w-[80%] bg-[#f8f9fa] px-4 py-3 rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-[2px]">
                      <p className="text-sm font-normal leading-[1.55] text-[#25252a] whitespace-pre-wrap">{message.content}</p>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <p className="text-sm font-normal leading-[1.55] text-[#25252a] whitespace-pre-wrap">{message.content}</p>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#a1b0b7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#a1b0b7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#a1b0b7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input - sticky to bottom */}
        <div className="p-2 bg-[#ebf0f5]">
          <div className="bg-white border border-[#dee5eb] rounded-2xl shadow-[0_0_25px_0px_rgba(0,0,0,0.05)] px-3 py-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask any support question"
              className="w-full min-h-[60px] bg-transparent outline-none resize-none text-sm font-normal leading-[1.55] text-[#25252a] placeholder:text-[#a1b0b7]"
              disabled={isLoading}
            />
            <div className="flex items-center justify-end gap-2 pt-1.5">
              <button className="w-[22px] h-[22px] flex items-center justify-center rounded hover:bg-[#f8f9fa] cursor-pointer transition-colors">
                <IconMicrophone size={14} stroke={1.5} className="text-[#a1b0b7]" />
              </button>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${
                  !inputValue.trim() || isLoading
                    ? 'bg-[#a1b0b7] cursor-not-allowed'
                    : 'bg-[#205ae3] hover:bg-[#1a4bc7] cursor-pointer'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 10.5V3.5M7 3.5L4 6.5M7 3.5L10 6.5" stroke="white" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

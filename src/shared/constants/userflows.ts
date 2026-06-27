import { 
  UserPlus, 
  LogIn, 
  Database, 
  Upload, 
  Layout, 
  TrendingUp, 
  Share2, 
  Download, 
  Users, 
  Bell, 
  Clock, 
  Cpu, 
  Settings,
  LucideIcon
} from 'lucide-react';

export interface FlowStep {
  stepNumber: number;
  title: string;
  actorAction: string;
  systemResponse: string;
  usabilityDetail: string;
}

export interface UserFlowSpec {
  id: string;
  name: string;
  objective: string;
  iconName: string; // Used to map to React elements dynamically
  usabilityThesis: string;
  whyItWorks: string[];
  cognitiveLoadReduction: string; // e.g. "72% Reduction in cognitive steps"
  interactionMetrics: {
    averageTimeToComplete: string;
    clicksRequired: number;
    errorRate: string;
  };
  steps: FlowStep[];
}

export const userFlowsData: UserFlowSpec[] = [
  {
    id: 'signup',
    name: 'Frictionless Sign-Up',
    objective: 'Onboard new analytical team members into the platform in under 30 seconds with zero password fatigue.',
    iconName: 'UserPlus',
    usabilityThesis: 'Standard signup forms require password rules, confirmations, and email verifications, which induce high drop-off rates. Our flow uses a secure passwordless magic link and federated single-sign-on (SSO), reducing onboarding steps to a single-click identity validation.',
    whyItWorks: [
      'Eliminates password formulation and validation requirements.',
      'Saves Google Workspace/Okta enterprise profile data automatically to pre-populate company profiles.',
      'Auto-creates isolated team spaces based on email domains (e.g., matching @stripe.com users).'
    ],
    cognitiveLoadReduction: '75% reduction in onboarding friction',
    interactionMetrics: {
      averageTimeToComplete: '18 seconds',
      clicksRequired: 2,
      errorRate: '0.4%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Input Email or Select SSO Provider',
        actorAction: 'Enters corporate email or clicks "Continue with Google Workspace/Okta".',
        systemResponse: 'Instantly disables screen controls, displays loading spinner, and checks domains.',
        usabilityDetail: 'Using domain sniffing to immediately group team workspaces, avoiding manual domain setup.'
      },
      {
        stepNumber: 2,
        title: 'Instant Link Dispatch',
        actorAction: 'Checks email client (if email option selected).',
        systemResponse: 'Transmits cryptographic magic link token and updates UI with success status.',
        usabilityDetail: 'Avoids traditional complex password fields and criteria checkboxes altogether.'
      },
      {
        stepNumber: 3,
        title: 'Landing & Profile Ingestion',
        actorAction: 'Clicks secure link in email or accepts SSO permissions.',
        systemResponse: 'Authenticates session token, provisions user profile, and opens Workspace onboarding canvas.',
        usabilityDetail: 'Preserves initial referral path to land users on their intended dashboard.'
      }
    ]
  },
  {
    id: 'login',
    name: 'Unified Sign-In & Cookie Restore',
    objective: 'Re-authenticate active analysts instantly, keeping workspace assets secure without blocking speed.',
    iconName: 'LogIn',
    usabilityThesis: 'Sign-in systems that repeatedly prompt users for credentials disrupt flow. By utilizing persistent HTTP-only session cookies and OAuth handshake caches, users return to exactly where they left off.',
    whyItWorks: [
      'Background cookie verification checks active sessions on first load, eliminating login screen renders.',
      'Provides Okta, GitHub, and email magic links on a clean centralized auth card.',
      'Keeps layout fully centered and distraction-free.'
    ],
    cognitiveLoadReduction: 'Zero-step login for returning sessions',
    interactionMetrics: {
      averageTimeToComplete: '1.2 seconds (cached) / 8 seconds (new)',
      clicksRequired: 1,
      errorRate: '0.1%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Root Path Visit',
        actorAction: 'Navigates to the platform root path.',
        systemResponse: 'Interrogates local cookies. If valid, restores active Redux state and redirects to Dashboard.',
        usabilityDetail: 'Bypasses the login screen completely if an active valid session is detected.'
      },
      {
        stepNumber: 2,
        title: 'Credential Screen Fallback',
        actorAction: 'If session expired, selects "Login via GitHub SSO" or enters login credentials.',
        systemResponse: 'Flashes input focus, redirects to authorization provider with token handshake.',
        usabilityDetail: 'Hides auxiliary registration links to keep authentication flows strictly focused.'
      },
      {
        stepNumber: 3,
        title: 'Session Restore',
        actorAction: 'Authorized by identity provider.',
        systemResponse: 'Sets session cookies, restores previous path from local storage, and loads data tables.',
        usabilityDetail: 'Maintains user focus by avoiding hard page refreshes or returning to home screen defaults.'
      }
    ]
  },
  {
    id: 'connect-db',
    name: 'Secure Database Connector',
    objective: 'Connect analytical databases (PostgreSQL, ClickHouse, BigQuery) with instant health feedback.',
    iconName: 'Database',
    usabilityThesis: 'Connecting data infrastructure is notoriously fragile. Our wizard provides immediate connection testing feedback with full diagnostic stack traces inside the UI, avoiding the typical trial-and-error cycle of missing database credentials or firewall blocks.',
    whyItWorks: [
      'Renders instant inline connection diagnostic testing indicators.',
      'Supports automated SSL and tunnel configurations via simple toggles.',
      'Offers copy-paste friendly firewall whitelist IP badges.'
    ],
    cognitiveLoadReduction: '85% fewer diagnostic attempts',
    interactionMetrics: {
      averageTimeToComplete: '45 seconds',
      clicksRequired: 4,
      errorRate: '3.2% (handled inline)'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Select Engine Type',
        actorAction: 'Clicks "Add Data Source" and selects ClickHouse or PostgreSQL.',
        systemResponse: 'Renders credential connection fields with pre-filled port defaults.',
        usabilityDetail: 'Hides complex advanced connection parameters until explicitly toggled by power users.'
      },
      {
        stepNumber: 2,
        title: 'Input Parameters & Copy Whitelist IPs',
        actorAction: 'Enters connection string credentials and copies the static IP whitelist.',
        systemResponse: 'Displays active Whitelist IPs with a single-click copy button.',
        usabilityDetail: 'Provides whitelisting guidelines early, preventing common network routing connection errors.'
      },
      {
        stepNumber: 3,
        title: 'Simulate Connection Test',
        actorAction: 'Clicks "Test Connection" to verify connection.',
        systemResponse: 'Dispatches secure query to database, returning green "Succeeded" or Red diagnostic tooltips.',
        usabilityDetail: 'Saves configuration state only after a successful query validation to prevent database synchronization failures.'
      }
    ]
  },
  {
    id: 'upload-csv',
    name: 'Drag-and-Drop CSV Ingest',
    objective: 'Upload and convert flat local CSV datasets into high-performance database tables.',
    iconName: 'Upload',
    usabilityThesis: 'Manually setting column data types for flat files is tedious. Our CSV ingestion flow runs client-side schema inference, immediately classifying data types (Datetime, Integer, Text) and letting users adjust selections via clean dropdown cards before finalizing upload.',
    whyItWorks: [
      'Infers schemas automatically, removing manual database table mapping steps.',
      'Renders high-frequency progress indicators tracking uploading and file compression speeds.',
      'Alerts users about parsed null values early, avoiding pipeline interruptions.'
    ],
    cognitiveLoadReduction: '90% fewer manual column mapping decisions',
    interactionMetrics: {
      averageTimeToComplete: '14 seconds (for 10MB file)',
      clicksRequired: 2,
      errorRate: '1.5%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Drag and Drop File',
        actorAction: 'Drags target dataset file onto the upload workspace card.',
        systemResponse: 'Highlights border frames in glowing indigo, parses file metadata, and shows load progress.',
        usabilityDetail: 'Accepts drag actions anywhere on the card container to maximize hit targets.'
      },
      {
        stepNumber: 2,
        title: 'Schema Review & Type Map',
        actorAction: 'Inspects inferred column tables and overrides a datatype using column dropdown selectors.',
        systemResponse: 'Renders interactive preview data columns showing detected data classes.',
        usabilityDetail: 'Color-codes datatypes (green for Int, orange for Text) for quick cognitive scanning.'
      },
      {
        stepNumber: 3,
        title: 'Execute Data Loading',
        actorAction: 'Clicks "Start Ingest" to commit database insertion.',
        systemResponse: 'Streams file data, logs insertion counts, and registers the table in workspace schemas.',
        usabilityDetail: 'Displays processing statistics (e.g. 24,000 rows/sec) to reassure users of active loading progress.'
      }
    ]
  },
  {
    id: 'create-dashboard',
    name: 'One-Click Dashboard Creation',
    objective: 'Generate a polished analytical dashboard from predefined templates or blank canvases.',
    iconName: 'Layout',
    usabilityThesis: '"Blank canvas anxiety" blocks creators. This flow pre-populates templates geared for SaaS, Financial, or System Operational analytics, establishing clean layout boundaries instantly.',
    whyItWorks: [
      'Pre-configures functional widgets to bypass manual design setup.',
      'Saves layouts automatically in the background using workspace Git snapshots.',
      'Structures pages symmetrically with a 12-column template layout.'
    ],
    cognitiveLoadReduction: '80% reduction in setup effort',
    interactionMetrics: {
      averageTimeToComplete: '8 seconds',
      clicksRequired: 2,
      errorRate: '0.0%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Trigger Creation Creator',
        actorAction: 'Clicks "Create Dashboard" button or triggers shortcut ⌘ N.',
        systemResponse: 'Renders centered creation overlay displaying template choices and source selections.',
        usabilityDetail: 'Keeps focus on metadata parameters like Dashboard Name and Tag Collections.'
      },
      {
        stepNumber: 2,
        title: 'Select Template Presets',
        actorAction: 'Hover-scans preset previews and selects "SaaS Metrics Overview".',
        systemResponse: 'Synthesizes bento grid structure, pre-configures trend cards, and loads data feeds.',
        usabilityDetail: 'Utilizes high-contrast previews to communicate the visual structure of each template.'
      },
      {
        stepNumber: 3,
        title: 'Canvas Mounting',
        actorAction: 'Enters dashboard name and selects database source.',
        systemResponse: 'Launches full responsive dashboard canvas, and binds real-time database schema fields.',
        usabilityDetail: 'Focuses cursor automatically on the main dashboard title to prompt immediate customization.'
      }
    ]
  },
  {
    id: 'build-charts',
    name: 'Visual Chart Builder Studio',
    objective: 'Translate raw SQL database queries into rich, interactive visual dashboards.',
    iconName: 'TrendingUp',
    usabilityThesis: 'Traditional BI platforms isolate chart configuration from preview panels. Our builder uses a split-panel studio, linking draggable query fields directly with responsive visual chart objects that update in under 20ms.',
    whyItWorks: [
      'Updates visual charts immediately on dragging a parameter field.',
      'Protects screen borders by automatically shortening huge numerical scales.',
      'Supports fast toggling between visual charts and raw SQL code sheets.'
    ],
    cognitiveLoadReduction: '65% faster visual verification',
    interactionMetrics: {
      averageTimeToComplete: '22 seconds',
      clicksRequired: 3,
      errorRate: '1.2%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Drag Coordinate Fields',
        actorAction: 'Drags "created_at" to X-Axis drop zone and "revenue" to Y-Axis drop zone.',
        systemResponse: 'Glows active drop zones, validates data types, and triggers backend data aggregation.',
        usabilityDetail: 'Restricts invalid field drops early, notifying users when metrics are mismatched with graph axes.'
      },
      {
        stepNumber: 2,
        title: 'Select Visual Encoding',
        actorAction: 'Clicks "Area Chart" from chart type selector panel.',
        systemResponse: 'Draws responsive SVG graphics with high-contrast color paths and hover crosshairs.',
        usabilityDetail: 'Applies WCAG-compliant color palettes automatically to ensure charts are readable.'
      },
      {
        stepNumber: 3,
        title: 'Save & Bind Widget',
        actorAction: 'Clicks "Save Chart to Canvas" (⌘ S).',
        systemResponse: 'Compiles configuration metadata and embeds the chart widget into the 12-column dashboard.',
        usabilityDetail: 'Maintains user workflow by keeping the design panel state open for secondary chart creation.'
      }
    ]
  },
  {
    id: 'share-dashboard',
    name: 'Granular Workspace Sharing',
    objective: 'Distribute dashboards securely to third parties with token-scoped access parameters.',
    iconName: 'Share2',
    usabilityThesis: 'Sharing dashboards often risks full account data exposure. This flow provides granular, expiring tokenized URLs, enabling secure, read-only dashboard shares that can be revoked with a single click.',
    whyItWorks: [
      'Generates unique, tokenized, expiring web-links to protect workspaces.',
      'Offers one-click URL copying directly to clipboard.',
      'Enables password-protection toggles directly in the sharing modal.'
    ],
    cognitiveLoadReduction: '95% reduction in compliance overhead',
    interactionMetrics: {
      averageTimeToComplete: '12 seconds',
      clicksRequired: 2,
      errorRate: '0.2%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Share Interface',
        actorAction: 'Clicks "Share" in dashboard top navigation bar.',
        systemResponse: 'Pops a modal containing link configurations, SSO parameters, and access controls.',
        usabilityDetail: 'Focuses immediately on clipboard settings, highlighting link generation states.'
      },
      {
        stepNumber: 2,
        title: 'Configure Expiration Limits',
        actorAction: 'Toggles "Expires in 7 days" and limits domain permissions to "internal-team.com".',
        systemResponse: 'Signs a cryptographically signed web-token on our server to lock down data queries.',
        usabilityDetail: 'Pre-fills restrictive security defaults to prevent accidental public exposures.'
      },
      {
        stepNumber: 3,
        title: 'Copy Tokenized URL',
        actorAction: 'Clicks "Copy Secure Link" to share.',
        systemResponse: 'Copies the link to the clipboard and displays a green validation badge.',
        usabilityDetail: 'Provides a copyable markdown link template to support clean formatting in Slack or Email.'
      }
    ]
  },
  {
    id: 'export-reports',
    name: 'Monospace Report Exporter',
    objective: 'Compile and download raw database data grids as CSV, Parquet, or high-fidelity PDFs.',
    iconName: 'Download',
    usabilityThesis: 'Heavy downloads block UI responsiveness. Our report exporter runs compilation tasks asynchronously in the background, showing a quiet progress bar in the utility panel while leaving the user free to query data.',
    whyItWorks: [
      'Processes heavy compilation asynchronously, preventing browser freeze.',
      'Supports CSV, PDF, and high-performance Parquet format downloads.',
      'Preserves database data types in exported spreadsheet structures.'
    ],
    cognitiveLoadReduction: 'Zero UI lock-time during large exports',
    interactionMetrics: {
      averageTimeToComplete: '5 seconds (config) / Background processing',
      clicksRequired: 2,
      errorRate: '0.5%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Initiate Export Configuration',
        actorAction: 'Clicks "Export" on any query table grid.',
        systemResponse: 'Displays dropdown selection panel for target formats (CSV, Parquet, PDF).',
        usabilityDetail: 'Displays estimated file size metrics beforehand to help users gauge download requirements.'
      },
      {
        stepNumber: 2,
        title: 'Configure Scope Range',
        actorAction: 'Selects "Current filtered rows" and targets Parquet compression schema.',
        systemResponse: 'Spawns a background compilation task, releasing the UI thread immediately.',
        usabilityDetail: 'Permits continuous application interaction while large background compilations are running.'
      },
      {
        stepNumber: 3,
        title: 'Complete and Deliver Download',
        actorAction: 'Clicks the download banner when compilation completes.',
        systemResponse: 'Downloads the schema-preserved data file and clears background processing indicators.',
        usabilityDetail: 'Pings the user with a subtle visual notification to announce the ready state.'
      }
    ]
  },
  {
    id: 'invite-users',
    name: 'Collaborative Team Invitations',
    objective: 'Invite team analysts with explicit security role configurations in under 10 seconds.',
    iconName: 'Users',
    usabilityThesis: 'Context switching to administrative pages breaks analytical focus. Our invite modal lets creators add team emails with clear role definitions (Admin, Analyst, Read-Only) directly from their active dashboard.',
    whyItWorks: [
      'Maintains context by utilizing overlay modals over active dashboards.',
      'Renders explicit role permissions summaries beforehand to clarify access.',
      'Displays active pending invitation trackers within the admin grid.'
    ],
    cognitiveLoadReduction: '80% fewer clicks to add collaborators',
    interactionMetrics: {
      averageTimeToComplete: '11 seconds',
      clicksRequired: 3,
      errorRate: '0.8%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Trigger Invite Dialog',
        actorAction: 'Clicks "Invite Team" on top global navigation bar.',
        systemResponse: 'Displays active user list and shows new invitation slots.',
        usabilityDetail: 'Focuses cursor on the email slot immediately to allow fast typing.'
      },
      {
        stepNumber: 2,
        title: 'Input Emails & Roles',
        actorAction: 'Enters user emails and selects "Analyst (SQL Allowed)" from role dropdown.',
        systemResponse: 'Validates email formats and updates the visual permissions outline.',
        usabilityDetail: 'Lists exact system permissions (e.g. "Can execute queries, cannot delete databases") inline.'
      },
      {
        stepNumber: 3,
        title: 'Dispatch Secure Access',
        actorAction: 'Clicks "Send Invitations" to dispatch access.',
        systemResponse: 'Dispatches signed magic onboarding links and displays temporary "Pending Invite" cards.',
        usabilityDetail: 'Clears the field instantly to let administrators type additional emails with no interruption.'
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Global High-Signal Notifications',
    objective: 'Monitor pipeline status changes and coordinate system triggers via unified alerts.',
    iconName: 'Bell',
    usabilityThesis: 'Too many notifications create warning fatigue. Our system centralizes operational warnings and database sync alerts into a high-contrast side-panel, grouping redundant events to keep your inbox clean.',
    whyItWorks: [
      'Consolidates repeated warning logs into a single expander slot.',
      'Offers fast routing directly to source database connection profiles.',
      'Enables Slack, Webhook, and Email routing rules directly from panels.'
    ],
    cognitiveLoadReduction: '65% fewer separate system warnings',
    interactionMetrics: {
      averageTimeToComplete: '3 seconds (to acknowledge)',
      clicksRequired: 1,
      errorRate: '0.1%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Unread Alert Indicators',
        actorAction: 'Notices pulsing amber indicator dot on global header Bell icon.',
        systemResponse: 'Displays quiet pulse on Bell icon. Keeps layout clean with zero disruptive pop-ups.',
        usabilityDetail: 'Avoids visual interruption during active query execution.'
      },
      {
        stepNumber: 2,
        title: 'Toggle Notification Panel',
        actorAction: 'Clicks Bell icon or triggers shortcut G then N.',
        systemResponse: 'Slides open the panel on the right side of the screen, displaying grouped pipeline warnings.',
        usabilityDetail: 'Uses readable layout lists that preserve underlying dashboard visuals.'
      },
      {
        stepNumber: 3,
        title: 'Acknowledge & Navigate',
        actorAction: 'Clicks "Resolve connection error" on PostgreSQL warning.',
        systemResponse: 'Acknowledges status logs and opens database connection setup for active diagnostic tracing.',
        usabilityDetail: 'Navigates directly to the root source of the warning in a single click, bypasses search paths.'
      }
    ]
  },
  {
    id: 'scheduling',
    name: 'Visual Ingestion Scheduling',
    objective: 'Establish reliable automated database queries and report synchronization schedules.',
    iconName: 'Clock',
    usabilityThesis: 'Cron schemas are prone to syntax mistakes. Our scheduler uses an interactive visual interval builder, detailing exact upcoming execution times in the user\'s local timezone to prevent timing errors.',
    whyItWorks: [
      'Visual interval selector bypasses technical cron-syntax requirements.',
      'Pre-calculates and displays next execution dates in high-contrast text lines.',
      'Limits query resource execution ranges to prevent server overload.'
    ],
    cognitiveLoadReduction: '90% fewer timing alignment errors',
    interactionMetrics: {
      averageTimeToComplete: '25 seconds',
      clicksRequired: 3,
      errorRate: '1.4%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Toggle Ingestion Period',
        actorAction: 'Selects database sync settings and clicks "Edit Schedule".',
        systemResponse: 'Renders scheduling controls (Every Hour, Every Day, Custom Cron).',
        usabilityDetail: 'Defaults schedules to non-peak hours automatically to protect operational database limits.'
      },
      {
        stepNumber: 2,
        title: 'Review Upcoming Trigger Timelines',
        actorAction: 'Selects "Every Day at 04:00 AM" in visual controls.',
        systemResponse: 'Pre-calculates and displays upcoming runtimes (e.g. "Next run: Tomorrow, June 28, at 4:00 AM PDT").',
        usabilityDetail: 'Saves user from manually mapping server GMT times to their local timezone.'
      },
      {
        stepNumber: 3,
        title: 'Commit Cron Task',
        actorAction: 'Clicks "Apply Schedule".',
        systemResponse: 'Registers cron parameters and updates background database syncing loops.',
        usabilityDetail: 'Displays a success indicator with active run details on the workspace monitoring page.'
      }
    ]
  },
  {
    id: 'ai-assistant',
    name: 'Conversational Co-Pilot (AI)',
    objective: 'Synthesize data graphs and write accurate SQL statements using simple conversational prompts.',
    iconName: 'Cpu',
    usabilityThesis: 'Typing code into AI interfaces often results in copying errors. Our AI Co-Pilot generates interactive cards directly inside chat windows, letting analysts deploy generated SQL code or layouts with a single click.',
    whyItWorks: [
      'Validates generated SQL queries against schemas to prevent syntax errors.',
      'Embeds "Apply" buttons in code frames to insert SQL code instantly.',
      'Color-codes referenced database tables for easy scanning.'
    ],
    cognitiveLoadReduction: '80% faster query design',
    interactionMetrics: {
      averageTimeToComplete: '15 seconds',
      clicksRequired: 1,
      errorRate: '1.8%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Launch Conversational Drawer',
        actorAction: 'Triggers shortcut ⌘ K or clicks the Assistant icon.',
        systemResponse: 'Slides open the AI Assistant drawer on the right side of the screen, focusing the input field.',
        usabilityDetail: 'Keeps existing dashboard work readable on the left side of the screen.'
      },
      {
        stepNumber: 2,
        title: 'Input Conversational Inquiry',
        actorAction: 'Types "Show weekly sales totals as a bar graph for postgres_analytics".',
        systemResponse: 'Translates query into SQL, validates syntax against schema definitions, and streams the SQL code.',
        usabilityDetail: 'Annotates referenced tables with visual schema markers to confirm context.'
      },
      {
        stepNumber: 3,
        title: 'Deploy to Worksheet',
        actorAction: 'Clicks "Apply Workspace Worksheet" overlay button.',
        systemResponse: 'Closes drawer, opens SQL playground, and runs query aggregation instantly.',
        usabilityDetail: 'Avoids copy-paste actions entirely to eliminate syntax and indentation errors.'
      }
    ]
  },
  {
    id: 'settings',
    name: 'Auto-Saving Settings Dashboard',
    objective: 'Manage analytical workspace properties and secure API credential sets with zero friction.',
    iconName: 'Settings',
    usabilityThesis: 'Unsaved configuration changes are frustrating. Our dashboard utilizes unified auto-saving: as soon as an input field loses focus, changes are committed with a quiet visual success indicator at the base of the page.',
    whyItWorks: [
      'Saves configuration properties automatically on field blur.',
      'Safeguards sensitive credentials by hiding API keys behind interactive click-to-reveal toggles.',
      'Features distinct red-tinted hazard panels for critical irreversible actions.'
    ],
    cognitiveLoadReduction: 'Eliminates "Unsaved changes" anxiety',
    interactionMetrics: {
      averageTimeToComplete: '10 seconds',
      clicksRequired: 1,
      errorRate: '0.2%'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Navigate to Configuration Cockpit',
        actorAction: 'Clicks Settings icon or triggers shortcut G then S.',
        systemResponse: 'Renders organized configuration columns and auto-focuses first category input.',
        usabilityDetail: 'Preserves the layout of the sidebar nav to support quick exits.'
      },
      {
        stepNumber: 2,
        title: 'Edit Credentials & Access Secret Keys',
        actorAction: 'Edits workspace name or clicks "Reveal Private Key" to copy api key.',
        systemResponse: 'Reveals cryptographic key and shows a 30-second expiring security counter.',
        usabilityDetail: 'Masks keys on copy to prevent exposure to nearby observers.'
      },
      {
        stepNumber: 3,
        title: 'Automated Blur Synchronization',
        actorAction: 'Clicks out of the input field to save.',
        systemResponse: 'Saves the configuration in the background and displays "Changes Saved" in the header.',
        usabilityDetail: 'Eliminates the need for manual "Save Changes" clicks, saving time.'
      }
    ]
  }
];

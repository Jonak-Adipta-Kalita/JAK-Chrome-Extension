const notificationsContainer = document.getElementById("notifications")!;
const fetchBtn = document.getElementById("fetchBtn")!;

export interface GithubRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    } | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}

const btnPress = (name: string) => {
    const element = document.getElementById(`${name}-notifyBtn`)!;

    if (element.innerText === "Enable") {
        localStorage.setItem(`${name}-notifyBtn`, "Disable");
    } else {
        localStorage.setItem(`${name}-notifyBtn`, "Enable");
    }

    element.innerText = localStorage.getItem(`${name}-notifyBtn`)!;
};

const displayProjects = async () => {
    const ACCOUNT_NAME = "Jonak-Adipta-Kalita";
    const url = `https://api.github.com/users/${ACCOUNT_NAME}/repos`;

    const response = await fetch(url);
    const data = (await response.json()) as GithubRepo[];

    const projectsHTML = data
        .filter((repo) => repo.private === false && repo.name !== ACCOUNT_NAME)
        .map((repo) => {
            const nameArray = repo.name.split("-");
            nameArray.shift();
            const name = nameArray.join("-").toLowerCase();

            const buttonTitle =
                localStorage.getItem(`${name}-notifyBtn`) || "Enable";

            return `
                <div class="${name}">
                    <p>${repo.name.split("-").join(" ")}</p>
                    <button class="notify-btn" id="${name}-notifyBtn">
                        ${buttonTitle}
                    </button>
                </div>
            `;
        });

    notificationsContainer.innerHTML = projectsHTML.join("");

    document.getElementById("api-notifyBtn")!.addEventListener("click", () => {
        btnPress("api");
    });
    document
        .getElementById("chrome-extension-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("chrome-extension");
        });
    document
        .getElementById("command-line-tool-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("command-line-tool");
        });
    document
        .getElementById("desktop-app-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("desktop-app");
        });
    document
        .getElementById("discord-bot-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("discord-bot");
        });
    document
        .getElementById("go-package-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("go-package");
        });
    document
        .getElementById("javascript-package-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("javascript-package");
        });
    document
        .getElementById("minecraft-datapack-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("minecraft-datapack");
        });
    document
        .getElementById("minecraft-modpack-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("minecraft-modpack");
        });
    document
        .getElementById("mobile-app-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("mobile-app");
        });
    document
        .getElementById("programming-language-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("programming-language");
        });
    document
        .getElementById("python-package-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("python-package");
        });
    document
        .getElementById("telegram-bot-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("telegram-bot");
        });
    document
        .getElementById("vscode-extension-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("vscode-extension");
        });
    document
        .getElementById("website-notifyBtn")!
        .addEventListener("click", () => {
            btnPress("website");
        });
};

displayProjects();

fetchBtn.addEventListener("click", () => {
    fetch(`${process.env.SERVER_URL}/notifications/read`, { method: "GET" })
        .then((response) => {
            try {
                return response.json();
            } catch (error) {
                console.log(error);
            }
        })
        .then((data) => {
            if (data.length !== 0) {
                fetch(`${process.env.SERVER_URL}/notifications/delete`, {
                    method: "DELETE",
                });
                data?.map(async (release: any, index: number) => {
                    const name: string = release.repository.name
                        .toLowerCase()
                        .split("jak-")[0];

                    if (
                        localStorage.getItem(`${name}-notifyBtn`) === "Enable"
                    ) {
                        chrome.runtime.sendMessage({ release, name });
                    }
                });
            }
        });
});

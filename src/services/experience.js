import experience from '@/data/experience.js'
import projects from '@/data/projects.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = new Date();
const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

// 'YYYY-MM' -> month index, so ranges can be compared and subtracted
const toMonths = (date) => {
    const [year, month = '1'] = (date ?? nowKey).split('-');
    return Number(year) * 12 + Number(month) - 1;
};

export const formatDate = (date) => {
    const [year, month] = date.split('-');
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

export const formatRange = (start, end) => `${formatDate(start)} – ${end ? formatDate(end) : 'Present'}`;

// Each company spans its earliest role start to its latest role end
export const work = experience.work
    .map(job => {
        const starts = job.roles.map(r => r.start).sort();
        const isCurrent = job.roles.some(r => !r.end);
        const end = isCurrent ? null : job.roles.map(r => r.end).sort().at(-1);
        return { ...job, start: starts[0], end, isCurrent };
    })
    .sort((a, b) => toMonths(b.end) - toMonths(a.end) || toMonths(b.start) - toMonths(a.start));

export const { education, certifications } = experience;

const currentJob = work.find(job => job.isCurrent) ?? work[0];
export const currentRole = { ...currentJob.roles[0], company: currentJob.company };

export const earliestStart = work.map(job => job.start).sort()[0];

const monthsWorked = toMonths(null) - toMonths(earliestStart) + 1;
export const yearsExperience = Math.floor(monthsWorked / 12);
// Months completed towards the next full year, 0-11
export const monthsIntoYear = monthsWorked % 12;

export const releasedCount = projects.minecraft.filter(p => !p.comingSoon).length;

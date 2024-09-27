import type { Cms } from '@prisma/client';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cn, string2Color } from '~/lib/utils';
import { api } from '~/utils/api';

interface CmsContextProps {
	cms: Cms | null;
	list: Cms[];
}

export const CmsContext = createContext<CmsContextProps>({ cms: null, list: [] });

export default function CmsProvider({ children, session }: { children: ReactNode; session: Session | null }) {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [cmsId, setCmsId] = useState('');
	const [cms, setCms] = useState<Cms | null>(null);
	const [list, setList] = useState<Cms[]>([]);

	const listCmsQuery = api.cms.list.useQuery();

	useEffect(() => {
		if (listCmsQuery.status != 'success') return;

		fetchCmsData()
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				router.replace('/');
			});
	}, [router.asPath, listCmsQuery.status]);

	const fetchCmsData = async () => {
		const id = router.query.cmsId as string;
		const userCms = listCmsQuery.data?.data.cms as Cms[];

		// Find CMS
		if (id) {
			const _cms = userCms.find((c) => c.id == id);

			// If no cms, return error
			if (!_cms) throw new Error('not_found');
			// Set cms data
			setCms(_cms);
			setCmsId(_cms.id);
		}

		// Set list data
		setList(userCms);
	};

	return loading ? null : <CmsContext.Provider value={{ cms, list }}>{children}</CmsContext.Provider>;
}

export function useCms() {
	const { cms, list } = useContext(CmsContext);

	return { cms, list };
}

export function CmsImage({ cms, className }: { cms: Cms; className?: string }) {
	if (cms.image.length > 0) {
		return (
			<Image
				src={cms.image}
				width={200}
				height={200}
				alt={cms.title}
				className={cn('h-8 w-8 rounded-full object-cover object-center', className)}
			/>
		);
	} else {
		const color = string2Color(cms.title);

		return (
			<div
				className={cn('relative z-20 flex h-8 w-8 items-center justify-center rounded-full border text-lg font-medium')}
				style={{ color, borderColor: color }}
			>
				{cms.title[0]}
				<div
					className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-full opacity-20"
					style={{ backgroundColor: color }}
				></div>
			</div>
		);
	}
}

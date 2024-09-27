import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCms } from '~/components/core/cms';
import Dashboard from '~/components/core/dashboard';
import CreateCmsForm from '~/components/forms/create-cms-form';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { api } from '~/utils/api';

export default function Page() {
	// const getUserCmsQuery = api.cms.getUserCms.useQuery();
	const { cms, list } = useCms();
	const router = useRouter();
	const session = useSession({
		required: true,
	});

	const [loading, setLoading] = useState(true);
	const [dialog, setDialog] = useState('');

	return (
		<Dashboard
			cms={null}
			session={session.data!}
			requiresCms={false}
			header={{
				title: 'All sites',
				buttons: (
					<>
						<Button type="button" size={'sm'} onClick={() => setDialog('create_site')}>
							Create new site
						</Button>
					</>
				),
			}}
		>
			<h1>yo</h1>

			<CreateCmsForm visible={dialog == 'create_site'} onCancel={() => setDialog('')} />
		</Dashboard>
	);
}

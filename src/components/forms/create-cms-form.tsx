import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { modalFormProps } from '~/utils/types';
import { cn } from '~/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useState } from 'react';

const formSchema = z.object({
	title: z.string().min(1),
});

export default function CreateCmsForm({ visible, onSubmit, onCancel }: modalFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);
		console.log(data);
	};

	return (
		<Dialog open={visible} onOpenChange={loading ? undefined : onCancel}>
			<DialogContent className="w-[400px]" aria-describedby="">
				<DialogHeader>
					<DialogTitle>Create new site</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className={cn({
							'pointer-events-none opacity-70': loading,
						})}
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel data-required>Title</FormLabel>
									<FormControl>
										<Input placeholder="My awesome website" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="mt-4 flex items-center justify-between">
							<Button type="button" variant={'secondary'} disabled={loading} onClick={loading ? undefined : onCancel}>
								Cancel
							</Button>
							<Button disabled={loading}>Done</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

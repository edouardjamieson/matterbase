import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { dbResponse } from '~/server/db';

// Get single CMS
const get = protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
	const response: dbResponse = {
		data: {},
		success: true,
	};

	const cms = await ctx.db.cms.findFirst({
		where: {
			id: input.id,
		},
	});

	response.data = { cms };
	return response;
});

// Get user's CMS
const list = protectedProcedure.query(async ({ ctx }) => {
	const response: dbResponse = {
		data: {},
		success: true,
	};

	const cms = await ctx.db.cms.findMany({
		where: {
			users: {
				some: {
					id: ctx.session.user.id,
				},
			},
		},
		include: {
			templates: true,
		},
	});

	response.data = { cms };
	return response;
});

// Create cms
const create = protectedProcedure.input(z.object({ title: z.string() })).mutation(async ({ ctx, input }) => {
	const response: dbResponse = {
		data: {},
		success: true,
	};

	const cms = await ctx.db.cms.create({
		data: {
			image: '',
			title: input.title,
			createdById: ctx.session.user.id,
			users: {
				connect: {
					id: ctx.session.user.id,
				},
			},
		},
	});

	response.data = { cms };
	return response;
});

export const cmsRouter = createTRPCRouter({ get, list, create });

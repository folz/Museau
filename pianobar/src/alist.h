/*
 * alist.h
 *
 * -vk
 */

#pragma once

#include "basic.h"
SOURCE_DECL

typedef struct {
	size_t	cur;
	size_t	max;
	cval*	arr;
} alist;

alist*	AL_new();
void	AL_free(alist* li);
void	AL_resize(alist* li, size_t len);
void	AL_insert(alist* li, size_t idx, cval data);
cval	AL_remove(alist* li, size_t idx);
void	AL_push_back(alist* li, cval data);
cval	AL_pop_back(alist* li);
void	AL_foreach(alist* li, foreach_fn fn, cval ctx);

#ifndef NDEBUG
void	AL_pprint(alist* li);
#else
# define AL_pprint(li)
#endif

SOURCE_END

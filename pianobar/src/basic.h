/*
 * basic.h
 * 
 * -vk
 */

#pragma once

#ifdef __cplusplus
# define SOURCE_DECL	extern "C" {
# define SOURCE_END	}
#else
# define SOURCE_DECL
# define SOURCE_END
#endif

SOURCE_DECL

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <time.h>
#include <assert.h>

#define safe_new(var, type, stmt) \
	if ((var = calloc(1, sizeof(type))) == NULL) { stmt; } \

#define safe_calloc(var, type, nr, stmt) \
	if ((var = calloc(nr, sizeof(type))) == NULL) { stmt; } \

#define safe_malloc(var, type, size, stmt) \
	if ((var = malloc(size)) == NULL) { stmt; } \

#ifdef NDEBUG
# define debugf(fmt, ...)
#else
# include <stdarg.h>
void debugf(const char* fmt, ...);
#endif

#define OOM	"out of memory"

typedef int8_t s8;
typedef int16_t s16;
typedef int32_t s32;
typedef int64_t s64;
typedef uint8_t u8;
typedef uint16_t u16;
typedef uint32_t u32;
typedef uint64_t u64;
typedef unsigned long ulong;

typedef union {
	s8	i8;
	s16	i16;
	s32	i32;
	s64	i64;
	u8	ui8;
	u16	ui16;
	u32	ui32;
	u64	ui64;
	long	lng;
	ulong	ulng;
	float	flt;
	double	dbl;
	bool	bln;
	size_t	size;
	void*	ptr;
} cval;

#define cvpod(pod)	((cval) (pod))
#define cvptr(ptr)	((cval) ((void*) (ptr)))
#define nil		cvptr(0)

typedef int (*foreach_fn)(cval data, cval ctx);
typedef int (*key_cmp)(const cval lhs, const cval rhs);
typedef u32 (*key_hash)(const cval key);

void	bprint(char* data, size_t len);

int	DTOR_free(cval data, cval ctx);

u32	fnv_hash(const u8* val, size_t len);
u32	cvpod_hash(const cval pod);
u32	str_hash(const cval str);

void*	RAND_new();
void	RAND_get(void* state, char* buf, size_t len);
void	RAND_free(void* state);

SOURCE_END
